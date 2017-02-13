import * as tagService from '../../common/tagService'

export const TAG_CREATED = 'TAG_CREATED'
export const ALL_TAGS_LOADED = 'ALL_TAGS_LOADED'

const createTagAction = tag => {
    return {
        type: TAG_CREATED,
        payload: {
            tag
        }
    }
}

const getAllTagsAction = tags => {
    return {
        type: ALL_TAGS_LOADED,
        payload: {
            tags
        }
    }
}

export const createTag = tag => {
    return dispatch => {
        return tagService.createTag(tag)
            .then(createdTag => {
                dispatch(createTagAction(createdTag))
                return createdTag
            })
    }
}

export const getAllTags = () => {
    return dispatch => {
        return tagService.getAllTags()
            .then(tags => {
                dispatch(getAllTagsAction(tags))
            })
    }
}