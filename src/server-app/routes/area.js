const areaService = require('../data/entityServices/areaService')

const createArea = (req, res) => {
    return areaService.createArea(req.body)
        .then(area => {
            res.send(area)
        })
}

const getAreaById = (req, res) => {
    return areaService.getAreaById(req.params.id)
        .then(area => {
            res.send(area);
        })
}

const createNoteForArea = (req, res) => {
    return areaService.createNoteForArea(req.body)
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