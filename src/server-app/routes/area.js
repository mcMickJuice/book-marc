const bookmarcClient = require('../data/bookmarcClient')

const createArea = (req, res) => {
    return bookmarcClient.createArea(req.body)
        .then(area => {
            res.send(area)
        })
}

const getAreaById = (req, res) => {
    return bookmarcClient.getAreaById(req.params.id)
        .then(area => {
            res.send(area);
        })
}

const createNoteForArea = (req, res) => {
    return bookmarcClient.createNoteForArea(req.body)
        .then(areaNote => {
            res.send(areaNote)
        })
}

module.exports = app => {
    const url = '/api/area';
    app.post(`${url}/note`, createNoteForArea)    
    app.post(url, createArea)
    app.get(`${url}/:id`, getAreaById)
}