const {createConn} = require('./dbClient')

const BOOKMARC_DB = process.env.BOOKMARC_DB;

let dbConn = null
module.exports.connect = () => {
    //if no dbConn or not connected, connect to database and cache connection
    if(dbConn == null || !dbConn.serverConfig.isConnected()) {
        return createConn(BOOKMARC_DB)
            .then(db => {
                dbConn = db;
                return db;
            })
    }
    //return cached connection. 
    return Promise.resolve(dbConn)
}