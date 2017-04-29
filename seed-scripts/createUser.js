require('dotenv').config();
const insertUser = require('../src/server-app/auth/authHelper').insertUser;

const user = process.env.USER;
const pw = process.env.PW;

if(user == null || pw == null) {
    throw new Error('user or pw is null')
}

insertUser(user, pw)
    .then(() => console.log(`User '${user}' created with password '${pw}'`))
    .then(() => process.exit())