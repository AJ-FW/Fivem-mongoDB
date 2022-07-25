const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const aggregatefun = function(dbname, params, callback) {
    if (!Router.CheckCorrectDatabase(dbname)) {
        if (!Router.checkDatabaseReady(dbname)) return;
        if (!Router.checkParams(params)) return console.log(`[MongoDB][ERROR] exports.count: Invalid params object.`);
        let collection = Router.getParamsCollection(dbname, params);
        if (!collection) return console.log(`[MongoDB][ERROR] exports.insert: Invalid collection "${params.collection}"`);
        const query = utils.safeObjectArgument(params.query);
        let cursor = collection.aggregate([query])
        cursor.toArray((err, documents) =>{
            if (err) {
                console.log(`[MongoDB][ERROR] exports.find: Error "${err.message}".`);
                utils.safeCallback(callback, false, err.message);
                return;
            }; 
            utils.safeCallback(callback, true, utils.exportDocuments(documents));
        })
        process._tickCallback();
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
}

module.exports = {
    aggregatefun,
}