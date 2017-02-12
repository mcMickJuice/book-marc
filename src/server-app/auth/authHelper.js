const jwt = require('jsonwebtoken')
const {connect} = require('../data/bookmarcDbClient')
const bcrypt = require('bcrypt')

const USER_COLLECTION = 'users'
const saltRound = 10;

module.exports.createTokenFromUser = function createToken(user) {
    var {username} = user;
    return jwt.sign({username}, process.env.SECRET)
}

module.exports.authenticateUser = function(username, password) {
    //query db for user
    return connect()
        .then(db => {
            const coll = db.collection(USER_COLLECTION)

            return coll.findOne({username: username})
                .then(user => {
                    return new Promise((resolve, reject) => {
                        if(user == null) {
                            reject('Invalid username or password')
                            return;
                        }

                        if(bcrypt.compareSync(password, user.password)) {
                            //dont you dare return password here
                            const {username} = user;
                            resolve({username})
                        } else {
                            reject('Invalid username or password')
                        }
                    })
                })
        })
}

module.exports.insertUser = function(username, password) {
    return connect()
        .then(db => {
            const coll = db.collection(USER_COLLECTION)

            const hashedPw = bcrypt.hashSync(password, saltRound);
            return coll.insertOne({username, password: hashedPw})
        })
}