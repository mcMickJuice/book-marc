const { connect } = require('../bookmarcDbClient')
const {aggregateBookmarkActivity} = require('./aggregations')

const BOOKMARK_COLLECTION = 'bookmarks';

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
