import {get, put, post} from './httpClient'
import config from './config';

const createUrl = route => {
    return `${config.apiUrl}/${route}`
}

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

export const updateBookmark = bookmark => {
    const url = createUrl(`bookmark/${bookmark.id}`)
    return put(url, bookmark)
        .then(responseHandler)

}