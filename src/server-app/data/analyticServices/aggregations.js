const moment = require('moment')


const getWeek = (dateInMs, format) => moment(dateInMs).startOf('week').format(format || 'M/D/YY')
const groupBy = (coll, key) => {
    return coll.reduce((acc, next) => {
        if (acc[next[key]] == null) {
            acc[next[key]] = []
        }
        const arr = acc[next[key]]
        acc[next[key]] = [...arr, next]

        return acc;
    }, {})
}

const find = (coll, predicate) => {
    return coll.filter(predicate)[0];
}

module.exports.aggregateBookmarkActivity = (bookmarks, dateInMs) => {
    const format = 'M/D';
    const readBms = bookmarks
        .filter(b => b.isRead)
        .map(b => ({
            week: getWeek(b.readDate, format),
            isRead: true
        }));
    const createdBms = bookmarks
        .filter(b => b.createdDate > dateInMs)
        .map(b => ({
            week: getWeek(b.createdDate, format),
            isAdded: true
        }))

    const groupedByWeek = groupBy([...readBms, ...createdBms], 'week');
    const results = Object.keys(groupedByWeek).map(key => {
        const collection = groupedByWeek[key];

        return {
            week: key,
            read: collection.filter(i => i.isRead).length,
            added: collection.filter(i => i.isAdded).length
        }
    })

    return results;
}

module.exports.joinCountWithTagDescription = (tagsWithCount, tagDetails) => {
    return tagsWithCount.map(t => {
        const tagDetail = find(tagDetails, tag => tag._id == t._id);

        return {
            name: tagDetail.name,
            value: t.count
        }
    })
    .sort((first, second) => second.value - first.value)
    .slice(0,5)
}