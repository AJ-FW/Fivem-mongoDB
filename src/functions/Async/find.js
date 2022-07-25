const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const findfunawait = async(dbname,params) =>{
    if (!Router.CheckCorrectDatabase(dbname)) {
        if (!Router.checkDatabaseReady(dbname)) return;
        if (!Router.checkParams(params)) return console.log(`[MongoDB][ERROR] exports.find: Invalid params object.`);
        let collection = Router.getParamsCollection(dbname,params);
        if (!collection) return console.log(`[MongoDB][ERROR] exports.insert: Invalid collection "${params.collection}"`);
        const query = utils.safeObjectArgument(params.query);
        const options = utils.safeObjectArgument(params.options);
        if (params.limit) {
            return Router.validateDocuments (await collection.find(query, options).limit(params.limit).toArray()) 
        }
        return Router.validateDocuments (await collection.find(query, options).toArray())
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
};

module.exports = {
    findfunawait,
}