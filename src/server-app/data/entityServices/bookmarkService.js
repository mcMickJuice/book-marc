const {connect} = require('../bookmarcDbClient')
const {toViewModel, ObjectId} = require('../mongoHelper');

const BOOKMARC_COLLECTION = 'bookmarks';

module.exports.createBookmark = (bookmark) => {
    return connect()
        .then(db => {
            const coll = db.collection(BOOKMARC_COLLECTION);

            return coll.insertOne(bookmark)
                .then(toViewModel)
        })
}

//change to get bookmarks for user
module.exports.getBookmarks = () => {
    return connect()
        .then(db => {
            const coll = db.collection(BOOKMARC_COLLECTION);

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
            const coll = db.collection(BOOKMARC_COLLECTION);

            return coll.findOne({ _id: new ObjectId(id) })
                .then(bookmark => {
                    return toViewModel(bookmark);
                })
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


const updateBookmark = (id, updateObj) => {
    return connect()
        .then(db => {
            const coll = db.collection(BOOKMARC_COLLECTION);

            return coll.updateOne({ _id: new ObjectId(id) }, { $set: updateObj })
        })
}