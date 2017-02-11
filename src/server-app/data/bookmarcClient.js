const {createConn, ObjectId} = require('./dbClient');
const {toViewModel} = require('./mongoHelper');

const BOOKMARC_DB = process.env.BOOKMARC_DB;
const BOOKMARC_COLLECTION = 'bookmarks';
const AREA_COLLECTION = 'areas';
const AREA_NOTE_COLLECTION = 'areaNotes';


module.exports.createBookmark = (bookmark) => {
    return createConn(BOOKMARC_DB)
        .then(db => {
            const coll = db.collection(BOOKMARC_COLLECTION);

            return coll.insertOne(bookmark)
                .then(() => {
                    db.close(); //this feels wrong. shouldnt dbClient close db?
                    return toViewModel(bookmark);
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

module.exports.getBookmarkById = id => {
    return createConn(BOOKMARC_DB)
        .then(db => {
            const coll = db.collection(BOOKMARC_COLLECTION);

            return coll.findOne({ _id: new ObjectId(id) })
                .then(bookmark => {
                    db.close();
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

module.exports.createArea = area => {
    return createConn(BOOKMARC_DB)
        .then(db => {
            const coll = db.collection(AREA_COLLECTION);

            return coll.insertOne(area)
                .then(() => {
                    db.close();
                    return toViewModel(area);
                })
        })
}

module.exports.getAreaById = id => {
    return createConn(BOOKMARC_DB)
        .then(db => {
            const areaColl = db.collection(AREA_COLLECTION);

            const areaTask = areaColl.findOne({ _id: new ObjectId(id) })
                .then(area => {
                    // db.close();
                    return toViewModel(area)
                })

            const noteColl = db.collection(AREA_NOTE_COLLECTION);

            const noteTask = noteColl.find({areaId: id})
                .toArray()
                .then(notes => notes.map(toViewModel))

            return Promise.all([areaTask, noteTask])
                .then(tasks => {
                    db.close();
                    const area = tasks[0];
                    const notes = tasks[1];

                    return {area, notes}
                })
        })
}

// areaNote has areaId in it. we might need to use ObjectID instead of just text
//for lookups
module.exports.createNoteForArea = note => {
    return createConn(BOOKMARC_DB)
        .then(db => {
            const coll = db.collection(AREA_NOTE_COLLECTION);

            return coll.insertOne(note)
                .then(() => {
                    db.close();
                    return toViewModel(note)
                })
        })
}

const updateBookmark = (id, updateObj) => {
    return createConn(BOOKMARC_DB)
        .then(db => {
            const coll = db.collection(BOOKMARC_COLLECTION);

            return coll.updateOne({ _id: new ObjectId(id) }, { $set: updateObj })
                .then(() => {
                    db.close();
                })
        })
}

