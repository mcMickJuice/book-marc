var reducer = require('redux/bookmark/reducer').default
var {BOOKMARK_LOADED,
    BOOKMARK_UPDATED,
    RECENT_BOOKMARKS_LOADED,
    TAG_ADDED,
    TAG_REMOVED} = require('redux/bookmark/actions')


test('BOOKMARK_ADDED adds bookmark to state', () => {
    expect.assertions(1);
    const initialState = {
        bookmarks: []
    }

    const bookmark = {
        id: 1,
        title: 'new',
        url: 'new url'
    }
    const action = {
        type: BOOKMARK_LOADED,
        payload: {
            bookmark
        }
    }

    const result = reducer(initialState, action);

    expect(result.bookmarks.indexOf(bookmark) > -1).toBeTruthy()
})

test('BOOKMARK_UPDATED updates existing bookmark', () => {
    expect.assertions(2);
    const id = 1;
    const initialState = {
        bookmarks: [
            { id, title: 'old title', url: 'old url' }
        ]
    }

    const updatedBookmark = {
        id,
        title: 'new title',
        url: 'new url'
    }

    const action = {
        type: BOOKMARK_UPDATED,
        payload: {
            bookmark: updatedBookmark
        }
    }

    const result = reducer(initialState, action);

    const foundBookmark = result.bookmarks.filter(b => b.id === id)[0];

    expect(foundBookmark.title).toBe(updatedBookmark.title)
    expect(foundBookmark.url).toBe(updatedBookmark.url);
})

test('RECENT_BOOKMARKS_LOADED loads bookmarks', () => {
    expect.assertions(2)

    const initialState = {
        bookmarks: []
    }

    const firstState = reducer(initialState, { type: 'FAKE' })
    expect(firstState.bookmarks).toBe(initialState.bookmarks)

    const newBookmarks = [{ id: 1, title: 'hello' }, { id: 2, title: 'another one' }]
    const action = {
        type: RECENT_BOOKMARKS_LOADED,
        payload: {
            bookmarks: newBookmarks
        }
    }

    const result = reducer(firstState, action)

    expect(result.bookmarks).toEqual(newBookmarks)
})

test('TAG_ADDED will add tagId to specified bookmark', () => {
    expect.assertions(2)

    const initialState = {
        bookmarks: [
            { id: 2, tags: [] }
        ]
    }

    const action = {
        type: TAG_ADDED,
        payload: {
            bookmarkId: 2,
            tagId: 100
        }
    }

    const result = reducer(initialState, action);

    expect(result.bookmarks[0].tags.length).toBe(1)
    expect(action.payload.tagId).toBe(result.bookmarks[0].tags[0])
})

test('TAG_ADDED will not add TagId to incorrect bookmarkId', () => {
    expect.assertions(1)

    const initialState = {
        bookmarks: [
            { id: 2, tags: [] },
            { id: 4, tags: [5,6] }
        ]
    }

    const action = {
        type: TAG_ADDED,
        payload: {
            bookmarkId: 2,
            tagId: 100
        }
    }

    const result = reducer(initialState, action);

    const incorrectBm = result.bookmarks.filter(b => b.id === 4)[0]

    expect(incorrectBm.tags.indexOf(action.payload.tagId) === -1).toBeTruthy()
})

test('TAG_ADDED will create tags array and add tagId to bookmark', () => {
    expect.assertions(2)

    const initialState = {
        bookmarks: [
            {id: 1}
        ]
    }

    const action = {
        type: TAG_ADDED,
        payload: {
            bookmarkId: 1,
            tagId: 100
        }
    }

    const result = reducer(initialState, action);

    expect(result.bookmarks[0].tags != null).toBeTruthy()
    expect(result.bookmarks[0].tags.indexOf(100) > -1).toBeTruthy()
})

test('TAG_REMOVED will remove tagId from specified bookmarkId', () => {
    expect.assertions(1)

    const initialState = {
        bookmarks: [
            {id: 1, tags: [5]}
        ]
    }

    const action = {
        type:TAG_REMOVED,
        payload: {
            bookmarkId: 1,
            tagId: 5
        }
    }

    const result = reducer(initialState, action);

    expect(result.bookmarks[0].tags.length).toBe(0)
})

test('TAG_REMOVED will still work for non-existent tag array', () => {
    expect.assertions(2)

    const initialState = {
        bookmarks: [
            {id: 1}
        ]
    }

    const action = {
        type:TAG_REMOVED,
        payload: {
            bookmarkId: 1,
            tagId: 5
        }
    }

    const result = reducer(initialState, action);

    expect(result.bookmarks[0].tags != null).toBeTruthy()
    expect(result.bookmarks[0].tags.length).toBe(0)
})

test('Unknown action type doesn\'t alter state', () => {
    expect.assertions(1)

    const initialState = {
        bookmarks: []
    }

    const action = {
        type: 'FAKE actions'
    }

    const result = reducer(initialState, action);

    expect(result).toBe(initialState)
})