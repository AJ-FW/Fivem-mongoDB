const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const updatefun = function(dbname, params, callback, isUpdateOne) {
    if (!Router.CheckCorrectDatabase(dbname)) {
        if (!Router.checkDatabaseReady(dbname)) return;
        if (!Router.checkParams(params)) return console.log(`[MongoDB][ERROR] exports.update: Invalid params object.`);
        let collection = Router.getParamsCollection(dbname,params);
        if (!collection) return console.log(`[MongoDB][ERROR] exports.insert: Invalid collection "${params.collection}"`);
        query = utils.safeObjectArgument(params.query);
        update = utils.safeObjectArgument(params.update);
        options = utils.safeObjectArgument(params.options);
        const cb = (err, res) => {
            if (err) {
                console.log(`[MongoDB][ERROR] exports.update: Error "${err.message}".`);
                utils.safeCallback(callback, false, err.message);
                return;
            }
            utils.safeCallback(callback, true, res.result.nModified);
        };
        isUpdateOne ? collection.updateOne(query, update, options, cb) : collection.updateMany(query, update, options, cb);
        process._tickCallback();
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
};

module.exports = {
    updatefun,
}