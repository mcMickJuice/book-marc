import {auth} from './httpClient'
import {createUrl, responseHandler} from './requestHelpers'

const {get, post} = auth;


export const createTag = tag => {
    const url = createUrl('tag')
    return post(url, tag)
        .then(responseHandler)
}

export const getAllTags = () => {
    const url = createUrl('tag')
    return get(url)
        .then(responseHandler)
}