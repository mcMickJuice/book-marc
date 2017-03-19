const dashboardDataService = require('../data/analyticServices/dashboardDataService')

const getDashboardData = (req, res) => {
    const { sinceDate } = req.query;

    const dateVal = Number(sinceDate);

    if(isNaN(dateVal)){
        res.statusCode = 400
        res.send(`sinceDate must be a number. Value provided ${sinceDate}`)
        return
    }

    const bookmarkActivityTask = dashboardDataService
        .getBookmarkActivity(dateVal);

    Promise.all([bookmarkActivityTask])
        .then(results => {
            const bookmarkActivity = results[0];

            res.send({
                bookmarkActivity
            })
        })
}

module.exports = app => {
    const url = '/api/dashboard';

    app.get(`${url}`, getDashboardData)
}