const bookmarkService = require('../data/entityServices/bookmarkService');


const createBookmark = (req, res) => {
    bookmarkService.createBookmark(req.body)
        .then(bookmark => {
            res.send(bookmark)
        })
}

const getBookmarks = (req, res) => {
    bookmarkService.getBookmarks()
        .then(bookmarks => {
            res.send(bookmarks)
        })
}

const getBookmarkById = (req, res) => {
    bookmarkService.getBookmarkById(req.params.bookmarkId)
        .then(bookmark => {
            res.send(bookmark);
        })
}

const updateBookmarkDescription = (req, res) => {
    bookmarkService.updateBookmarkDescription(req.body)
        .then(() => {
            res.send(/*http 200?*/);
        })
}

const updateBookmarkRating = (req, res) => {
    bookmarkService.updateBookmarkRating(req.body)
        .then(() => {
            res.send(/*http 200?*/);
        })
}

const markBookmarkAsRead = (req, res) => {
    bookmarkService.updateBookmarkAsRead(req.body)
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