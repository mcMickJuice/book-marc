const {connect} = require('../bookmarcDbClient')
const {toViewModel, ObjectId} = require('../mongoHelper')

const AREA_COLLECTION = 'areas'
const AREA_NOTE_COLLECTION = 'areaNotes'

module.exports.getAllAreas = () => {
    return connect()
        .then(db => {
            const coll = db.collection(AREA_COLLECTION);

            return coll.find()
                .toArray()
                .then(areas => areas.map(toViewModel))
        })
}

module.exports.createArea = area => {
    return connect()
        .then(db => {
            const coll = db.collection(AREA_COLLECTION);
            area.createdDate = Date.now();

            return coll.insertOne(area)
                .then(() => {
                    return toViewModel(area);
                })
        })
}

module.exports.getAreaById = id => {
    return connect()
        .then(db => {
            const areaColl = db.collection(AREA_COLLECTION);

            const areaTask = areaColl.findOne({ _id: new ObjectId(id) })
                .then(toViewModel)

            const noteColl = db.collection(AREA_NOTE_COLLECTION);

            const noteTask = noteColl.find({ areaId: id })
                .toArray()
                .then(notes => notes.map(toViewModel))

            return Promise.all([areaTask, noteTask])
                .then(tasks => {
                    const area = tasks[0];
                    const notes = tasks[1];

                    area.notes = notes;

                    return area
                })
        })
}

// areaNote has areaId in it. we might need to use ObjectID instead of just text
//for lookups
module.exports.createNoteForArea = note => {
    return connect()
        .then(db => {
            const coll = db.collection(AREA_NOTE_COLLECTION);

            return coll.insertOne(note)
                .then(() => {
                    return toViewModel(note)
                })
        })
}

//after area is created, this is for adding additional tags
module.exports.addTagToArea = (areaId, tagId) => {
    return connect()
        .then(db => {
            const coll = db.collection(AREA_COLLECTION);

            return coll.updateOne({ _id: new ObjectId(areaId) }, { $push: { tags: tagId } })
        })
}

module.exports.removeTagFromArea = (areaId, tagId) => {
    return connect()
        .then(db => {
            const coll = db.collection(AREA_COLLECTION)

            return coll.updateOne({ _id: new ObjectId(areaId) }, { $pullAll: { tags: [tagId] } })
        })
}