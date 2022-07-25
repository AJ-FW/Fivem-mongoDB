const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const deletefunawait = async(dbname, params, isDeleteOne) =>  {
    if (!Router.CheckCorrectDatabase(dbname)) {
        if (!Router.checkDatabaseReady(dbname)) return;
        if (!Router.checkParams(params)) return console.log(`[MongoDB][ERROR] exports.delete: Invalid params object.`);
        let collection = Router.getParamsCollection(dbname,params);
        if (!collection) return console.log(`[MongoDB][ERROR] exports.insert: Invalid collection "${params.collection}"`);
        const query = utils.safeObjectArgument(params.query);
        const options = utils.safeObjectArgument(params.options);
        if (isDeleteOne) {
            return Router.validateDocuments (await collection.deleteOne(query, options))
        } else {
            return Router.validateDocuments (await collection.deleteMany(query, options))
        }
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
};

module.exports = {
    deletefunawait,
}