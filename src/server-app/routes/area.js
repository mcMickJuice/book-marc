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
    const {areaId, tagId} = req.params;

    return areaService.addTagToArea(areaId, tagId)
        .then(() => {
            res.send()
        })
}

const removeTagFromArea = (req, res) => {
    const {areaId, tagId} = req.params;

    return areaService.removeTagFromArea(areaId, tagId)
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
    app.put(`${url}/:areaId/tag/:tagId`, addTagToArea)
    app.delete(`${url}/:areaId/tag/:tagId`, removeTagFromArea)
    app.post(url, createArea)
    app.get(`${url}/:id`, getAreaById)
    app.get(url, getAllAreas)
}