import {auth} from './httpClient'
import {getDateDiffByDays} from './dateService'
import { createUrl, responseHandler } from './requestHelpers'

const {get, post, put, deleteReq} = auth;

export const getRecentBookmarks = () => {
    //was 7 days, now 200..just show a bunch of unread bookmarks
    const twoHundredDaysAgo = getDateDiffByDays(Date.now(), -200);
    const url = createUrl(`bookmark/search?createdDate=${twoHundredDaysAgo}`)
    return get(url)
        .then(responseHandler)
}

export const searchBookmarksByTitle = searchTerm => {
    const url = createUrl(`bookmark/search?title=${searchTerm}`)
    return get(url)
        .then(responseHandler)
}

export const searchBookmarksByTag = tagId => {
    const url = createUrl(`bookmark/search?tagId=${tagId}`)
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

export const addTagToBookmark = (bookmarkId, tagId) => {
    const url = createUrl(`bookmark/${bookmarkId}/tag/${tagId}`)
    return put(url, {}) //put requires body in second param
        .then(responseHandler)
}

export const removeTagFromBookmark = (bookmarkId, tagId) => {
    const url = createUrl(`bookmark/${bookmarkId}/tag/${tagId}`)
    return deleteReq(url)
        .then(responseHandler)
}