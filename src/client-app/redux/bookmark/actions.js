import * as bookmarkClient from '../../common/bookmarkClient'
import {push} from 'react-router-redux'

export const BOOKMARK_LOADED = 'BOOKMARK_LOADED';
export const BOOKMARK_UPDATED = 'BOOKMARK_UPDATED';
export const RECENT_BOOKMARKS_LOADED = 'RECENT_BOOKMARKS_LOADED' 

const loadBookmark = bookmark => {
    return {
        type: BOOKMARK_LOADED,
        payload: {
            bookmark
        }
    }
}

export const addBookmark = bookmark => {
    return dispatch => {
        return bookmarkClient.createBookmark(bookmark)
            .then(updatedBookmark => {
                 dispatch(loadBookmark(updatedBookmark))
                 dispatch(push(`/bookmark/${updatedBookmark.id}`))
            })
    }
}

export const getBookmark = id => {
    return dispatch => {
        return bookmarkClient.getBookmark(id)
            .then(bookmark => {
                dispatch(loadBookmark(bookmark))
            })
    }
}

export const getRecentBookmarks = () => {
    return dispatch => {
        return bookmarkClient.getRecentBookmarks()
            .then(bookmarks => {
                dispatch({
                    type: RECENT_BOOKMARKS_LOADED,
                    payload: {
                        bookmarks
                    }
                })
            })
    }
}

export const updateBookmarkDescription = bookmark => {
    return dispatch => {
        return bookmarkClient.updateBookmarkDescription(bookmark)
            .then(() => {
                dispatch({
                    type: BOOKMARK_UPDATED,
                    payload: {
                        bookmark: bookmark
                    }
                })
            })
    }
}

export const updateBookmarkRating = bookmark => {
    return dispatch => {
        return bookmarkClient.updateBookmarkRating(bookmark)
            .then(() => {
                dispatch({
                    type: BOOKMARK_UPDATED,
                    payload: {
                        bookmark: bookmark
                    }
                })
            })
    }
}

export const updateBookmarkAsRead = bookmark => {
    return dispatch => {
        return bookmarkClient.markBookmarkAsRead(bookmark)
            .then(updatedBookmark => {
                dispatch({
                    type: BOOKMARK_UPDATED,
                    payload: {
                        bookmark: updatedBookmark
                    }
                })
            })
    }
}