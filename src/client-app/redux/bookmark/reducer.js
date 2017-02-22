import {
    BOOKMARK_LOADED,
    BOOKMARK_UPDATED,
    RECENT_BOOKMARKS_LOADED,
    TAG_ADDED,
    TAG_REMOVED
} from './actions'

const updateBookmark = (bookmarks, bookmark) => {
    return bookmarks.map(b => {
        if (b.id === bookmark.id) {
            return Object.assign({}, b, bookmark)
        }

        return b
    })
}

const addTag = (bookmarks, bookmarkId, tagId) => {
    return bookmarks.map(b => {
        if(b.id !== bookmarkId) {
            return b;
        }

        const tags = [...b.tags, tagId];

        return {
            ...b,
            tags
        }
    })
}

const removeTag = (bookmarks, bookmarkId, tagId) => {
    return bookmarks.map(b => {
        if(b.id !== bookmarkId) {
            return b;
        }

        const tags = b.tags.filter(t => t === tagId);

        return {
            ...b,
            tags
        }
    })
}

const bookmark = (state = { bookmarks: [] }, action) => {
    switch (action.type) {
        case BOOKMARK_LOADED:
            return Object.assign({}, state, {
                bookmarks: [...state.bookmarks, action.payload.bookmark]
            })
        case BOOKMARK_UPDATED:
            var updatedBookmarks = updateBookmark(state.bookmarks, action.payload.bookmark);
            return Object.assign({}, state, {
                bookmarks: updatedBookmarks
            });
        case RECENT_BOOKMARKS_LOADED:
            return Object.assign({}, state, {
                bookmarks: action.payload.bookmarks
            })
        case TAG_ADDED:
            return Object.assign({}, state, {
                bookmarks: addTag(state.bookmarks, action.payload.bookmarkId, action.payload.tagId)
            })
        case TAG_REMOVED:
            return Object.assign({}, state, {
                bookmarks: removeTag(state.bookmarks, action.payload.bookmarkId, action.payload.tagId)
            } )
        default:
            return state;
    }
}

export default bookmark;