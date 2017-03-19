const bookmarkRouter = require('./bookmark')
const loginRouter = require('./login')
const areaRouter = require('./area')
const tagRouter = require('./tag')
const dashboardRouter = require('./dashboard')

module.exports.use = function use(app) {
    bookmarkRouter(app);
    loginRouter(app);
    areaRouter(app);
    tagRouter(app);
    dashboardRouter(app);
}