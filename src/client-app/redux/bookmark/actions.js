import * as bookmarkService from '../../common/bookmarkService'
import { push } from 'react-router-redux'

export const BOOKMARK_LOADED = 'BOOKMARK_LOADED';
export const BOOKMARK_UPDATED = 'BOOKMARK_UPDATED';
export const RECENT_BOOKMARKS_LOADED = 'RECENT_BOOKMARKS_LOADED';
export const TAG_ADDED = 'TAG_ADDED';
export const TAG_REMOVED = 'TAG_REMOVED';

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
        return bookmarkService.createBookmark(bookmark)
            .then(updatedBookmark => {
                dispatch(loadBookmark(updatedBookmark))
                dispatch(push(`/bookmark/${updatedBookmark.id}`))
            })
    }
}

export const getBookmark = id => {
    return dispatch => {
        return bookmarkService.getBookmark(id)
            .then(bookmark => {
                dispatch(loadBookmark(bookmark))
            })
    }
}

export const getRecentBookmarks = () => {
    return dispatch => {
        return bookmarkService.getRecentBookmarks()
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

const createUpdateAction = payload => {
    return {
        type: BOOKMARK_UPDATED,
        payload
    }
}

export const updateBookmarkDescription = bookmark => {
    return dispatch => {
        return bookmarkService.updateBookmarkDescription(bookmark)
            .then(() => {
                dispatch(createUpdateAction({ bookmark }))
            })
    }
}

export const updateBookmarkRating = bookmark => {
    return dispatch => {
        return bookmarkService.updateBookmarkRating(bookmark)
            .then(() => {
                dispatch(createUpdateAction({ bookmark }))
            })
    }
}

export const updateBookmarkAsRead = bookmark => {
    return dispatch => {
        return bookmarkService.markBookmarkAsRead(bookmark)
            .then(updatedBookmark => {
                dispatch(createUpdateAction({ bookmark: updatedBookmark }))
            })
    }
}



export const addTagToBookmark = (bookmarkId, tagId) => {
    return dispatch => {
        return bookmarkService.addTagToBookmark(bookmarkId, tagId)
            .then(() => {
                dispatch({
                    type: TAG_ADDED,
                    payload: {
                        bookmarkId,
                        tagId
                    }
                })
            })
    }
}

export const removeTagFromBookmark = (bookmarkId, tagId) => {
    return dispatch => {
        return bookmarkService.removeTagFromBookmark(bookmarkId, tagId)
            .then(() => {
                dispatch({
                    type: TAG_REMOVED,
                    payload: {
                        bookmarkId,
                        tagId
                    }
                })
            })
    }
}