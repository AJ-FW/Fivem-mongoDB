const mongoDB = require('mongodb');
const Config  = require('../../config/config.json');
let dbs = {}

function init(){
    mongoDB.MongoClient.connect(Config["MongoDB-URL"], { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        if (err) return console.log("[MongoDB][ERROR] Failed to connect: " + err.message);
        Config.Database.forEach(value =>{
            dbs[value] = client.db(value)
            console.log(`[MongoDB] Connected to database "${value}".`);
            emit("onDatabaseConnect", value);
        })
    });
}

function checkDatabaseReady(dbname) {
    if (!dbs[dbname]) {
        console.log(`[MongoDB][ERROR] ${dbname} Database is not connected.`);
        return false;
    }
    return true;
};

function checkParams(params) {
    return params !== null && typeof params === 'object';
};

function getParamsCollection(dbname, params) {
    if (!params.collection) return;
    return dbs[dbname].collection(params.collection)
};

function CheckCorrectDatabase(dbname) {
    Config.Database.forEach(value => {
        if (value == dbname) {
            return true
        }
    });
    return false
}

const validateDocuments = (data) => {
    if (!Array.isArray(data)) return data;
    return data.map((d) => {
        if (d._id && typeof d._id !== 'string') d._id = d._id.toString();
        return d;
    });
};

const validateDocuments2 = (data) => {
    if (!Array.isArray(data)) return data;
    return data.map((d) => {
        if (d._id && typeof d._id !== 'string') d._id = d._id.toString();
        return d[1];
    });
};

module.exports = {
    init,
    checkDatabaseReady,
    checkParams,
    getParamsCollection,
    CheckCorrectDatabase,
    validateDocuments,
    validateDocuments2,
}