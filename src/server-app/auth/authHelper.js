var jwt = require('jsonwebtoken')

module.exports.createTokenFromUser = function createToken(user) {
    var {username} = user;
    return jwt.sign({username}, process.env.SECRET)
}