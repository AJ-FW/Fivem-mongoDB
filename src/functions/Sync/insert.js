const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const insertfun = function(dbname, params, callback) {
    if (!Router.CheckCorrectDatabase(dbname)) {
        if (!Router.checkDatabaseReady(dbname)) return;
        if (!Router.checkParams(params)) return console.log(`[MongoDB][ERROR] exports.insert: Invalid params object.`);
        let collection = Router.getParamsCollection(dbname,params);
        if (!collection) return console.log(`[MongoDB][ERROR] exports.insert: Invalid collection "${params.collection}"`);
        if (Router.checkParams(params)) {
            params.documents = [params.document];
            params.document = null;
        }
        let documents = params.documents;
        if (!documents || !Array.isArray(documents))
            return console.log(`[MongoDB][ERROR] exports.insert: Invalid 'params.documents' value. Expected object or array of objects.`);
        const options = utils.safeObjectArgument(params.options);
        collection.insertMany(documents, options, (err, result) => {
            if (err) {
                console.log(`[MongoDB][ERROR] exports.insert: Error "${err.message}".`);
                utils.safeCallback(callback, false, err.message);
                return;
            }
            let arrayOfIds = [];
            for (let key in result.insertedIds) {
                if (result.insertedIds.hasOwnProperty(key)) {
                    arrayOfIds[parseInt(key)] = result.insertedIds[key].toString();
                }
            }
            utils.safeCallback(callback, true, result.insertedCount, arrayOfIds);
        });
        process._tickCallback();
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
};

module.exports = {
    insertfun,
}