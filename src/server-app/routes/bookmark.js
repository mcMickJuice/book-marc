const bookmarcClient = require('../data/bookmarcClient');


const createBookmark = (req, res) => {
    bookmarcClient.createBookmark(req.body)
        .then(bookmark => {
            res.send(bookmark)
        })
}

const getBookmarks = (req, res) => {
    bookmarcClient.getBookmarks()
        .then(bookmarks => {
            res.send(bookmarks)
        })
}

const getBookmarkById = (req, res) => {
    bookmarcClient.getBookmarkById(req.params.bookmarkId)
        .then(bookmark => {
            res.send(bookmark);
        })
}

const updateBookmarkDescription = (req, res) => {
    bookmarcClient.updateBookmarkDescription(req.body)
        .then(() => {
            res.send(/*http 200?*/);
        })
}

const updateBookmarkRating = (req, res) => {
    bookmarcClient.updateBookmarkRating(req.body)
        .then(() => {
            res.send(/*http 200?*/);
        })
}

const markBookmarkAsRead = (req, res) => {
    bookmarcClient.updateBookmarkAsRead(req.body)
        .then((updateObj) => {
            res.send(updateObj)
        })
}

module.exports =  app => {
    const url = '/api/bookmark';
    app.post(url, createBookmark);
    app.get(url, getBookmarks);
    app.get(`${url}/:bookmarkId`, getBookmarkById)
    app.put(`${url}/description`, updateBookmarkDescription);
    app.put(`${url}/rating`, updateBookmarkRating);
    app.put(`${url}/read`, markBookmarkAsRead)
}