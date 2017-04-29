const reducer = require('redux/tag/reducer').default
const {TAG_CREATED, ALL_TAGS_LOADED} = require('redux/tag/actions')

test('TAG_CREATED adds tag to state', () => {
    expect.assertions(1);

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

    expect(result.indexOf(tag) > -1).toBeTruthy()
})

test('ALL_TAGS_LOADED loads tags in state', () => {
    expect.assertions(2);

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

    expect(result.length).toBe(tags.length)
    expect(result).toEqual(tags)
})

test('Unknown action type doesn\'t alter state', () => {
    expect.assertions(1);

    const initialState = [{
        name: 'tag 1',
        id: 23322
    }]

    const result = reducer(initialState, {type: 'UNKNOWN_TYPE'})

    expect(result).toEqual(initialState)
})