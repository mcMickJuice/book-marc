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

//search
const searchHandler = (req, res) => {
    const {createdDate, title, tagId} = req.query;

    if (createdDate != null) {
        searchBookmarksByDate(req, res)
    } else if (title != null) {
        searchBookmarksByTitle(req, res)
    } else if (tagId != null) {
        searchBookmarksByTag(req, res)
    } else {
        //no valid search terms provided
        res.status(400).send('No valid search query provided. Available query values: createdDate, title, tagId')
    }
}

const searchBookmarksByDate = (req, res) => {
    const {createdDate} = req.query;
    const dateNumber = Number(createdDate);

    if (isNaN(dateNumber)) {
        res.status(400).send('Created Date value must be a number')
        return
    }

    bookmarkService.searchBookmarksByDate(dateNumber)
        .then(bookmarks => {
            res.send(bookmarks)
        })
}

const searchBookmarksByTitle = (req, res) => {
    const {title} = req.query

    bookmarkService.searchBookmarksByTitle(title)
        .then(bookmarks => {
            res.send(bookmarks)
        })
}

const searchBookmarksByTag = (req, res) => {
    const {tagId} = req.query

    bookmarkService.searchBookmarksByTag(tagId)
        .then(bookmarks => {
            res.send(bookmarks)
        })
}

module.exports = app => {
    const url = '/api/bookmark';
    app.get(`${url}/search`, searchHandler)
    app.put(`${url}/description`, updateBookmarkDescription);
    app.put(`${url}/rating`, updateBookmarkRating);
    app.put(`${url}/read`, markBookmarkAsRead)
    app.get(`${url}/:bookmarkId`, getBookmarkById)
    app.post(url, createBookmark);
    app.get(url, getBookmarks);


}