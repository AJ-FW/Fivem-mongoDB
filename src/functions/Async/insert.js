const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const insertfunawait = async (dbname, params) => {
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
        return Router.validateDocuments (await collection.insertMany(documents, options));
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
};

module.exports = {
    insertfunawait,
}