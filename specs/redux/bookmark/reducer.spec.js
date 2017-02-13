var test = require('tape');
var reducer = require('../../../src/client-app/redux/bookmark/reducer').default
var {BOOKMARK_LOADED, BOOKMARK_UPDATED, RECENT_BOOKMARKS_LOADED} = require('../../../src/client-app/redux/bookmark/actions')


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

    const newBookmarks = [{ id: 1, title: 'hello' }, { id: 2, title : 'another one'}]
    const action = {
        type: RECENT_BOOKMARKS_LOADED,
        payload: {
            bookmarks: newBookmarks
        }
    }

    const result = reducer(firstState, action)

    t.deepEqual(result.bookmarks, newBookmarks)
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