import { auth } from './httpClient'
import { createUrl, responseHandler } from './requestHelpers'

const {get, post, put} = auth;

export const getAllAreas = () => {
    const url = createUrl('area')
    
    return get(url)
        .then(responseHandler)
}

export const createArea = area => {
    const url = createUrl('area')

    return post(url, area)
        .then(responseHandler);
}

export const fetchArea = areaId => {
    const url = createUrl(`area/${areaId}`)

    return get(url)
        .then(responseHandler)
}

export const addTagToArea = (areaId, tagId) => {
    const url = createUrl(`area/${areaId}/tag`)

    return put(url, { tagId })
}

export const createAreaNote = note => {
    const url = createUrl('area/note')

    return post(url, note)
        .then(responseHandler)
}