const test = require('tape')
const reducer = require('redux/tag/reducer').default
const {TAG_CREATED, ALL_TAGS_LOADED} = require('redux/tag/actions')

test('TAG_CREATED adds tag to state', t => {
    t.plan(1);

    const initialState = []

    const tag = {
        name: 'mikes tag',
        id: 1890
    }

    const action = {
        type: TAG_CREATED,
        payload: {
            tag
        }
    }

    const result = reducer(initialState, action)

    t.true(result.indexOf(tag) > -1)
})

test('ALL_TAGS_LOADED loads tags in state', t => {
    t.plan(2);

    const initialState = [];

    const tags = [
        {
            name: 'tag 1',
            id:1
        },
        {
            name: 'tag 2',
            id: 2
        }
    ]

    const action = {
        type: ALL_TAGS_LOADED,
        payload: {
            tags
        }
    }

    const result = reducer(initialState, action)

    t.equal(result.length, tags.length)
    t.deepEqual(result, tags)
})

test('Unknown action type doesn\'t alter state', t => {
    t.plan(1);

    const initialState = [{
        name: 'tag 1',
        id: 23322
    }]

    const result = reducer(initialState, {type: 'UNKNOWN_TYPE'})

    t.deepEqual(result, initialState)
})