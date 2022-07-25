const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const countfunawait = async(dbname, params)=>  {
    if (!Router.CheckCorrectDatabase(dbname)) {
        if (!Router.checkDatabaseReady(dbname)) return;
        if (!Router.checkParams(params)) return console.log(`[MongoDB][ERROR] exports.count: Invalid params object.`);
        let collection = Router.getParamsCollection(dbname, params);
        if (!collection) return console.log(`[MongoDB][ERROR] exports.insert: Invalid collection "${params.collection}"`);
        const query = utils.safeObjectArgument(params.query);
        const options = utils.safeObjectArgument(params.options);
        return Router.validateDocuments (await collection.countDocuments(query, options));
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
};

module.exports = {
    countfunawait,
}