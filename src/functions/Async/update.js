const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const updatefunawait = async (dbname, params, isUpdateOne)=> {
    if (!Router.CheckCorrectDatabase(dbname)) {
        if (!Router.checkDatabaseReady(dbname)) return;
        if (!Router.checkParams(params)) return console.log(`[MongoDB][ERROR] exports.update: Invalid params object.`);
        let collection = Router.getParamsCollection(dbname,params);
        if (!collection) return console.log(`[MongoDB][ERROR] exports.insert: Invalid collection "${params.collection}"`);
        query = utils.safeObjectArgument(params.query);
        update = utils.safeObjectArgument(params.update);
        options = utils.safeObjectArgument(params.options);
        if (isUpdateOne) {
            return Router.validateDocuments (await collection.updateOne(query, update, options))
        } else {
            return Router.validateDocuments (await collection.updateMany(query, update, options))
        }
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
};

module.exports = {
    updatefunawait,
}