const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const findandupdatefun = async (dbname, params, callback, isUpdateOne) => {
    if (!Router.CheckCorrectDatabase(dbname)) {
        if (!Router.checkDatabaseReady(dbname)) return;
        if (!Router.checkParams(params)) return console.log(`[MongoDB][ERROR] exports.findupdate Invalid Params object.`);
        let collection = Router.getParamsCollection(dbname, params)
        if (!collection) return console.log(`[MongoDB][ERROR] exports.findupdate: Invalid Collection ${params.collection}`)
        const query = utils.safeObjectArgument(params.query);
        const options = utils.safeObjectArgument(params.options);
        const update = utils.safeObjectArgument(params.update);
        let afterData = null
        if (isUpdateOne) {
            await Router.validateDocuments(collection.find(query, options).limit(1).toArray()).then((a) => {
                a.forEach(e => {afterData = e._id});
            });
        } else {
            await Router.validateDocuments(collection.find(query, options).toArray()).then((a) => {
                a.forEach(e => {afterData = e._id});
            });
        }
        const cb = (err, res) => {
            if (err) {
                console.log(`[MongoDB][ERROR] exports.update: Error "${err.message}".`);
                utils.safeCallback(callback, false, err.message);
                return;
            }
            utils.safeCallback(callback, true, res.result.nModified);
        }
        if (afterData) {
            if (isUpdateOne) {
                collection.updateOne(query, update, options, cb)
            } else {
                collection.updateMany(query, update, options, cb)
            }
        } else {
            console.log(`[MongoDB][ERROR] exports.update: Error "No Data Found".`);
        }
        process._tickCallback();
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
}

module.exports = {
    findandupdatefun,
}