import {BOOKMARK_LOADED, BOOKMARK_UPDATED, RECENT_BOOKMARKS_LOADED} from './actions'

const updateBookmark = (bookmarks, bookmark) => {
    return bookmarks.map(b => {
        if (b.id === bookmark.id) {
            return Object.assign({}, b, bookmark)
        }

        return b
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
        default:
            return state;
    }
}

export default bookmark;