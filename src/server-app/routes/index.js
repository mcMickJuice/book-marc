const bookmarkRouter = require('./bookmark')

module.exports.use = function use(app) {
    bookmarkRouter(app)
}