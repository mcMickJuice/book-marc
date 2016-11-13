var {createTokenFromUser} = require('../auth/authHelper')

const loginUser = (req, res) => {
    var user = req.body;
    //verify password for user

    var token = createTokenFromUser(user);

    res.send({token})
}

module.exports = app => {
    var url = '/api/login';

    app.post(url, loginUser)
}