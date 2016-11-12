const bookmarcClient = require('../data/bookmarcClient');


const createBookmark = (req, res) => {
    bookmarcClient.createBookmark(req.body)
        .then(bookmarkId => {
            res.send({id: bookmarkId})
        })
}

const getBookmarks = (req, res) => {
    bookmarcClient.getBookmarks()
        .then(bookmarks => {
            res.send(bookmarks)
        })
}


module.exports = function registerRoutes(app) {
    const url = '/api/bookmark';
    app.post(url, createBookmark);
    app.get(url, getBookmarks);
}