const {createConn} = require('./dbClient')

const BOOKMARC_DB = process.env.BOOKMARC_DB;

let dbConn = null
module.exports.connect = () => {
    //if no dbConn or not connected, connect to database and cache connection
    if(dbConn == null || !dbConn.serverConfig.isConnected()) {
        console.log('creating new connection')
        return createConn(BOOKMARC_DB)
            .then(db => {
                dbConn = db;
                return db;
            })
    }

    console.log('reusing connection')
    //return cached connection. 
    return Promise.resolve(dbConn)
}