const moment = require('moment')


const getWeek = dateInMs => moment(dateInMs).startOf('week').format('M/D/YY')
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

module.exports.aggregateBookmarkActivity = (bookmarks, dateInMs) => {
    const readBms = bookmarks
        .filter(b => b.isRead)
        .map(b => ({
            week: getWeek(b.readDate),
            isRead: true
        }));
    const createdBms = bookmarks
        .filter(b => b.createdDate > dateInMs)
        .map(b => ({
            week: getWeek(b.createdDate),
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