import {auth} from './httpClient'
// import {getToken} from './authClient'
import * as config from './config';

const createUrl = route => {
    return `${config.apiUrl}/${route}`
}

const {get, post, put} = auth;


const responseHandler = resp => {
    //what about errors?
    return resp.body;
}

export const getRecentBookmarks = () => {
    const url = createUrl('bookmark')
    return get(url)
        .then(responseHandler)
}

export const getBookmark = id => {
    const url = createUrl(`bookmark/${id}`)
    return get(url)
        .then(responseHandler)
}

export const createBookmark = newBookmark => {
    const url = createUrl('bookmark')
    return post(url, newBookmark)
        .then(responseHandler)

}

export const updateBookmarkDescription = bookmark => {
    const url = createUrl('bookmark/description');
    return put(url, bookmark)
        .then(responseHandler)
}

export const updateBookmarkRating = bookmark => {
    const url = createUrl('bookmark/rating')

    return put(url, bookmark)
        .then(responseHandler);
}

export const markBookmarkAsRead = bookmark => {
    const url = createUrl('bookmark/read')

    return put(url, bookmark)
        .then(responseHandler);
}

export const updateBookmark = bookmark => {
    const url = createUrl(`bookmark/${bookmark.id}`)
    return put(url, bookmark)
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

export const createAreaNote = note => {
    const url = createUrl(`area/note`)

    return post(url, note)
        .then(responseHandler)
}