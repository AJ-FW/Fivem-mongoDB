const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const aggregatefunawait = async(dbname, params) => {
    if (!Router.CheckCorrectDatabase(dbname)) {
        if (!Router.checkDatabaseReady(dbname)) return;
        if (!Router.checkParams(params)) return console.log(`[MongoDB][ERROR] exports.count: Invalid params object.`);
        let collection = Router.getParamsCollection(dbname, params);
        if (!collection) return console.log(`[MongoDB][ERROR] exports.insert: Invalid collection "${params.collection}"`);
        const query = utils.safeObjectArgument(params.query);
        return Router.validateDocuments (await collection.aggregate([query]).toArray())
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
}

module.exports = {
    aggregatefunawait,
}