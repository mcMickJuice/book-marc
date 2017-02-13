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

const addTagToArea = (req, res) => {
    const {id} = req.params;
    const {tagId} = req.body

    return areaService.addTagToArea(id, tagId)
        .then(() => {
            res.send()
        })
}

const getAllAreas = (req, res) => {
    return areaService.getAllAreas()
        .then(areas => {
            res.send(areas)
        })
}

module.exports = app => {
    const url = '/api/area';
    app.post(`${url}/note`, createNoteForArea)    
    app.put(`${url}/:id/tag`, addTagToArea)
    app.post(url, createArea)
    app.get(`${url}/:id`, getAreaById)
    app.get(url, getAllAreas)
}