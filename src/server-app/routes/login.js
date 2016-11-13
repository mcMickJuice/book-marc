var {createTokenFromUser, authenticateUser} = require('../auth/authHelper')

const loginUser = (req, res) => {
    var user = req.body;
    //verify password for user
    authenticateUser(user.username, user.password)
        .then(userInfo => {
            var token = createTokenFromUser(userInfo);
            res.send({token});
        })
        .catch(msg => {
            res.statusCode = 403;
            res.send(msg)
        })
}

module.exports = app => {
    var url = '/api/login';

    app.post(url, loginUser)
}