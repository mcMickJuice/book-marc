const {MongoClient, ObjectId} = require('mongodb');
const {dbUrl} = require('../config');

//dbCallback err, db
const createConn = (databaseName) => {
    const url = `${dbUrl}/${databaseName}`;
    return MongoClient.connect(url)
    .catch(err => {
        console.log(err);
        throw new Error(`Error connecting to mongo db ${url}. \r\n${JSON.stringify(err)}`);
    })
}

module.exports.createConn = createConn;
module.exports.ObjectId = ObjectId;

