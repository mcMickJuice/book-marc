const MongoClient = require('mongodb').MongoClient;
const {dbUrl} = require('../config');

//dbCallback err, db
const createConn = (databaseName) => {
    const url = `${dbUrl}/${databaseName}`;
    let dbInstance;
    return MongoClient.connect(url)
    .then(db => {
        return dbInstance = db;
    })
}

module.exports.createConn = createConn;

