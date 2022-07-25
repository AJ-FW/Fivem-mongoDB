const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const findandinsertawait = async (dbname, params) => {
    if (!Router.CheckCorrectDatabase(dbname)) {
        if (!Router.checkDatabaseReady(dbname)) return;
        if (!Router.checkParams(params)) return console.log(`[MongoDB][ERROR] exports.findupdate Invalid Params object.`);
        let collection = Router.getParamsCollection(dbname, params)
        if (!collection) return console.log(`[MongoDB][ERROR] exports.findupdate: Invalid Collection ${params.collection}`)
        const query = utils.safeObjectArgument(params.query);
        const options = utils.safeObjectArgument(params.options);
        let afterData = null
        await Router.validateDocuments(collection.find(query, options).toArray()).then((a) => {
            a.forEach(e => {afterData = e._id});
        });
        if (Router.checkParams(params)) {
            params.documents = [params.document];
            params.document = null;
        }
        let documents = params.documents;
        if (!documents || !Array.isArray(documents))
            return console.log(`[MongoDB][ERROR] exports.insert: Invalid 'params.documents' value. Expected object or array of objects.`);
        if (!afterData) {
            return Router.validateDocuments ( await collection.insertMany(documents, options));
        } else {
            console.log(`[MongoDB][ERROR] exports.update: Error "DataFound".`);
        }
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
}

module.exports = {
    findandinsertawait,
}