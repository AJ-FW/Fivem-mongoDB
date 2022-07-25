const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const countfun = function(dbname, params, callback) {
    if (!Router.CheckCorrectDatabase(dbname)) {
        if (!Router.checkDatabaseReady(dbname)) return;
        if (!Router.checkParams(params)) return console.log(`[MongoDB][ERROR] exports.count: Invalid params object.`);
        let collection = Router.getParamsCollection(dbname, params);
        if (!collection) return console.log(`[MongoDB][ERROR] exports.insert: Invalid collection "${params.collection}"`);
        const query = utils.safeObjectArgument(params.query);
        const options = utils.safeObjectArgument(params.options);
        collection.countDocuments(query, options, (err, count) => {
            if (err) {
                console.log(`[MongoDB][ERROR] exports.count: Error "${err.message}".`);
                utils.safeCallback(callback, false, err.message);
                return;
            }
            utils.safeCallback(callback, true, count);
        });
        process._tickCallback();
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
};

module.exports = {
    countfun,
}