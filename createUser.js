require('dotenv').config()
const {insertUser} = require('./src/server-app/auth/authHelper')

module.exports.createUser =  (username, password) => {
    return insertUser(username, password)
        .then(() => {
            console.log('user created')
        })
        .catch(err => console.error(err))
}
