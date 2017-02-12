const bookmarkRouter = require('./bookmark')
const loginRouter = require('./login')
const areaRouter = require('./area')
const tagRouter = require('./tag')

module.exports.use = function use(app) {
    bookmarkRouter(app);
    loginRouter(app);
    areaRouter(app);
    tagRouter(app)
}