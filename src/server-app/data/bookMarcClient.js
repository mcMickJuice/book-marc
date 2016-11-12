const {createConn} = require('./dbClient');
const {toViewModel} = require('./mongoHelper');

const BOOKMARC_DB = 'bookmarc'
const BOOKMARC_COLLECTION = 'bookmarks';

module.exports.createBookmark = (bookmark) => {
    return createConn(BOOKMARC_DB)
        .then(db => {
            const coll = db.collection(BOOKMARC_COLLECTION);

            return coll.insertOne(bookmark)
                .then(() => {

                    db.close(); //this feels wrong. shouldnt dbClient close db?
                    return bookmark._id
                })
        })
}

//change to get bookmarks for user
module.exports.getBookmarks = () => {
    return createConn(BOOKMARC_DB)
        .then(db => {
            const coll = db.collection(BOOKMARC_COLLECTION);

            return coll.find()
                .limit(20)
                .toArray()
                .then(bookmarks => {
                    db.close()
                    return bookmarks.map(toViewModel)
                });
        })
}

