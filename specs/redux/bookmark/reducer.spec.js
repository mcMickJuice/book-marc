var test = require('tape');
var reducer = require('redux/bookmark/reducer').default
var {BOOKMARK_LOADED,
    BOOKMARK_UPDATED,
    RECENT_BOOKMARKS_LOADED,
    TAG_ADDED,
    TAG_REMOVED} = require('redux/bookmark/actions')


test('BOOKMARK_ADDED adds bookmark to state', t => {
    t.plan(1);
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

    t.true(result.bookmarks.indexOf(bookmark) > -1)
})

test('BOOKMARK_UPDATED updates existing bookmark', t => {
    t.plan(2);
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

    t.equal(foundBookmark.title, updatedBookmark.title)
    t.equal(foundBookmark.url, updatedBookmark.url);
})

test('RECENT_BOOKMARKS_LOADED loads bookmarks', t => {
    t.plan(2)

    const initialState = {
        bookmarks: []
    }

    const firstState = reducer(initialState, { type: 'FAKE' })
    t.equal(firstState.bookmarks, initialState.bookmarks)

    const newBookmarks = [{ id: 1, title: 'hello' }, { id: 2, title: 'another one' }]
    const action = {
        type: RECENT_BOOKMARKS_LOADED,
        payload: {
            bookmarks: newBookmarks
        }
    }

    const result = reducer(firstState, action)

    t.deepEqual(result.bookmarks, newBookmarks)
})

test('TAG_ADDED will add tagId to specified bookmark', t => {
    t.plan(2)

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

    t.equal(result.bookmarks[0].tags.length,1, 'Bookmark has 1 tag')
    t.equal(action.payload.tagId,result.bookmarks[0].tags[0], 'Bookmark has added tagId')
})

test('TAG_ADDED will not add TagId to incorrect bookmarkId', t => {
    t.plan(1)

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

    t.assert(incorrectBm.tags.indexOf(action.payload.tagId) === -1, 'Other bookmark does not added TagId')
})

test('TAG_ADDED will create tags array and add tagId to bookmark', t => {
    t.plan(2)

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

    t.assert(result.bookmarks[0].tags != null, 'Tag array was created')
    t.assert(result.bookmarks[0].tags.indexOf(100) > -1, 'tag id was added to bookmark')
})

test('TAG_REMOVED will remove tagId from specified bookmarkId', t => {
    t.plan(1)

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

    t.equal(result.bookmarks[0].tags.length, 0, 'Bookmark had tag removed')
})

test('TAG_REMOVED will still work for non-existent tag array', t => {
    t.plan(2)

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

    t.assert(result.bookmarks[0].tags != null, 'Tags array exists on bookmark')
    t.equal(result.bookmarks[0].tags.length, 0, 'No tags exist in array')
})

test('Unknown action type doesn\'t alter state', t => {
    t.plan(1)

    const initialState = {
        bookmarks: []
    }

    const action = {
        type: 'FAKE actions'
    }

    const result = reducer(initialState, action);

    t.equal(result, initialState)
})