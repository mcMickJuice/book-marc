const bookmarkRouter = require('./bookmark')
const loginRouter = require('./login')

module.exports.use = function use(app) {
    bookmarkRouter(app);
    loginRouter(app);
}