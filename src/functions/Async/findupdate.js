const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const findandupdatefunawait = async(dbname, params, isUpdateOne) => {
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
        if (afterData) {
            if (isUpdateOne) {
                return Router.validateDocuments (await collection.updateOne(query, update, options))
            } else {
                return Router.validateDocuments (await collection.updateMany(query, update, options))
            }
        } else {
            console.log(`[MongoDB][ERROR] exports.update: Error "No Data Found".`);
        }
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
}

module.exports = {
    findandupdatefunawait,
}