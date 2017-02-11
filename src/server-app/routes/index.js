const bookmarkRouter = require('./bookmark')
const loginRouter = require('./login')
const areaRouter = require('./area')

module.exports.use = function use(app) {
    bookmarkRouter(app);
    loginRouter(app);
    areaRouter(app);
}