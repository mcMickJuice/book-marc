const tagService = require('../data/entityServices/tagService')

const createTag = (req, res) => {
    tagService.createTag(req.body)
        .then(tag => {
            res.send(tag)
        })
}

const getAllTags = (req, res) => {
    tagService.getAllTags()
        .then(tags => {
            res.send(tags)
        })
}

module.exports = app => {
    const url = '/api/tag';

    app.post(url, createTag)
    app.get(url, getAllTags)
}