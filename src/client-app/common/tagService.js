import {auth} from './httpClient'
import {apiUrl} from './config'

const {get, post} = auth;

const responseHandler = resp => resp.body;
const createUrl = route => `${apiUrl}/${route}`;

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