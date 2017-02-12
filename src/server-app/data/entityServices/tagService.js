const {connect} = require('../bookmarcDbClient')
const {toViewModel} = require('../mongoHelper')

const TAG_COLLECTION = 'tags';


//tag search occurs on client side...
module.exports.createTag = tag => {
    return connect()
        .then(db => {
            const coll = db.collection(TAG_COLLECTION);

            return coll.insertOne(tag)
                .then(() => toViewModel(tag))
        })
}

module.exports.getAllTags = () => {
    return connect()
        .then(db => {
            const coll = db.collection(TAG_COLLECTION)

            return coll.find()
                .toArray()
                .then(tags => {
                    return tags.map(toViewModel)
                })
        })
}
