const {getBookmarkActivity, getTagOverview} = require('../data/analyticServices/dashboardDataService')

const getDashboardData = (req, res) => {
    const { sinceDate } = req.query;

    const dateVal = Number(sinceDate);

    if(isNaN(dateVal)){
        res.statusCode = 400
        res.send(`sinceDate must be a number. Value provided ${sinceDate}`)
        return
    }

    const bookmarkActivityTask = getBookmarkActivity(dateVal);

    const tagOverview = getTagOverview();

    Promise.all([bookmarkActivityTask, tagOverview])
        .then(results => {
            const bookmarkActivity = results[0];
            const tagsOverview = results[1];

            res.send({
                bookmarkActivity,
                tagsOverview
            })
        })
}

module.exports = app => {
    const url = '/api/dashboard';

    app.get(`${url}`, getDashboardData)
}