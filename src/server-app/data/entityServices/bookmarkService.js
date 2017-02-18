const {connect} = require('../bookmarcDbClient')
const {toViewModel, ObjectId} = require('../mongoHelper');

const BOOKMARK_COLLECTION = 'bookmarks';
const SEARCH_LIMIT = 100;

module.exports.createBookmark = (bookmark) => {
    return connect()
        .then(db => {
            const coll = db.collection(BOOKMARK_COLLECTION);

            bookmark.createdDate = Date.now();

            return coll.insertOne(bookmark)
                .then(() => toViewModel(bookmark))
        })
}

//IsRead filtering will occur on the client
module.exports.searchBookmarksByDate = dateInMs => {
    return connect()
        .then(db => {
            const coll = db.collection(BOOKMARK_COLLECTION);

            return coll.find({createdDate: {$gt: dateInMs}})
                .sort({createdDate: -1})
                .limit(SEARCH_LIMIT)
                .toArray()
                .then(bookmarks => {
                    return bookmarks.map(toViewModel);
                })
        })
}

module.exports.searchBookmarksByTitle = searchTerm => {
    return connect() 
        .then(db => {
            const coll = db.collection(BOOKMARK_COLLECTION)

            return coll.find({$text: {
                $search: searchTerm,
                $caseSensitive: false
            }})
            .limit(SEARCH_LIMIT)
            .toArray()
            .then(bookmarks => {
                return bookmarks.map(toViewModel);
            })
        })
}

module.exports.searchBookmarksByTag = tagId => {
    return connect()
        .then(db => {
            const coll = db.collection(BOOKMARK_COLLECTION)

            return coll.find({tags: tagId})
                .limit(SEARCH_LIMIT)
                .toArray()
                .then(bookmarks => {
                    return bookmarks.map(toViewModel)
                })
        })
}

//change to get bookmarks for user
module.exports.getBookmarks = () => {
    return connect()
        .then(db => {
            const coll = db.collection(BOOKMARK_COLLECTION);

            return coll.find()
                .limit(20)
                .toArray()
                .then(bookmarks => {
                    return bookmarks.map(toViewModel)
                });
        })
}

module.exports.getBookmarkById = id => {
    return connect()
        .then(db => {
            const coll = db.collection(BOOKMARK_COLLECTION);

            return coll.findOne({ _id: new ObjectId(id) })
                .then(toViewModel)
        })
}

module.exports.updateBookmarkDescription = bookmark => {
    return updateBookmark(bookmark.id, {
        description: bookmark.description
    })
}

module.exports.updateBookmarkRating = bookmark => {
    return updateBookmark(bookmark.id, {
        rating: bookmark.rating
    })
}

module.exports.updateBookmarkAsRead = bookmark => {
    const readDate = Date.now();

    return updateBookmark(bookmark.id, {
        isRead: true,
        readDate: readDate
    })
        .then(() => {
            return {
                id: bookmark.id,
                readDate: readDate,
                isRead: true
            }
        })
}

//private
const updateBookmark = (id, updateObj) => {
    return connect()
        .then(db => {
            const coll = db.collection(BOOKMARK_COLLECTION);

            return coll.updateOne({ _id: new ObjectId(id) }, { $set: updateObj })
        })
}