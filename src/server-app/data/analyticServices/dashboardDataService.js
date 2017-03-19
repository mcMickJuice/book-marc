const { connect } = require('../bookmarcDbClient')
const { aggregateBookmarkActivity, joinCountWithTagDescription } = require('./aggregations')

//TODO move these to config values
const BOOKMARK_COLLECTION = 'bookmarks';
const TAG_COLLECTION = 'tags'

//data service to query/join data for homepage


module.exports.getBookmarkActivity = dateInMs => {
    return connect()
        .then(db => {
            const coll = db.collection(BOOKMARK_COLLECTION)

            const query = {
                $or: [
                    { createdDate: { $gt: dateInMs } },
                    { readDate: { $gt: dateInMs } }
                ]
            };
            const projection = {
                createdDate: true,
                readDate: true,
                isRead: true
            }

            return coll.find(query, projection)
                .toArray()
                .then(bms => aggregateBookmarkActivity(bms, dateInMs))

        })
}

module.exports.getTagOverview = () => {
    return connect()
        .then(db => {
            const bookmarkColl = db.collection(BOOKMARK_COLLECTION)
            const tagColl = db.collection(TAG_COLLECTION)

            //this aggregation proved too hard in mongo using aggregate pipeline
            //just get all tags tied to bookmark, group and join with tags
            return bookmarkColl.aggregate([
                { $unwind: '$tags' },
                { $project: { tags: 1, _id: 0 } },
                { $group: { _id: '$tags', count: { $sum: 1 } } }
            ]).toArray()
                .then(tagIdsWithCount => {
                    return tagColl.find()
                        .toArray()
                        .then(tags => joinCountWithTagDescription(tagIdsWithCount, tags))
                })

        })
}
