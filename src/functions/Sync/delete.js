const Router = require('../../database/database');
const utils  = require('../../utils/utils');

const deletefun = function(dbname, params, callback, isDeleteOne) {
    if (!Router.CheckCorrectDatabase(dbname)) {
        if (!Router.checkDatabaseReady(dbname)) return;
        if (!Router.checkParams(params)) return console.log(`[MongoDB][ERROR] exports.delete: Invalid params object.`);
        let collection = Router.getParamsCollection(dbname,params);
        if (!collection) return console.log(`[MongoDB][ERROR] exports.insert: Invalid collection "${params.collection}"`);
        const query = utils.safeObjectArgument(params.query);
        const options = utils.safeObjectArgument(params.options);
        const cb = (err, res) => {
            if (err) {
                console.log(`[MongoDB][ERROR] exports.delete: Error "${err.message}".`);
                utils.safeCallback(callback, false, err.message);
                return;
            }
            utils.safeCallback(callback, true, res.result.n);
        };
        isDeleteOne ? collection.deleteOne(query, options, cb) : collection.deleteMany(query, options, cb);
        process._tickCallback();
    } else {
        console.log(`${dbname} database not found in config.`)
        return false;
    }
};

module.exports = {
    deletefun,
}