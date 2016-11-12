export const getBookmarks = state => {
    return state.bookmark.bookmarks
}

export const getBookmarkById = (state, id) => {
    const foundBookmarks = getBookmarks(state).filter(b => b.id == id)

    return foundBookmarks[0]
}