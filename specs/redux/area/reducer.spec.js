const test = require('tape')
const reducer = require('../../../src/client-app/redux/area/reducer').default
const {AREA_LOADED, AREA_NOTE_ADDED, ALL_AREAS_LOADED, AREA_TAG_ADDED} = require('../../../src/client-app/redux/area/actions')

test('AREA_LOADED should add area to state', t => {
    t.plan(2)

    const initialState = [];

    const area = {
        id: 1,
        title: 'my area'
    }

    const action = {
        type: AREA_LOADED,
        payload: {
            area
        }
    }

    const result = reducer(initialState, action)

    t.equal(result.length, 1)
    t.equal(result[0], area)
})

test('AREA_NOTE_ADDED should add note to specified areaId', t => {
    t.plan(2);

    const initialState = [
        {id: 1, title: 'Not touched', notes: []},
        {id: 2, title: 'Touched', notes: []}
    ]

    const note = {
        id: 67,
        blurb: 'imma note!',
        areaId: 2        
    }

    const action = {
        type: AREA_NOTE_ADDED,
        payload: {
            note
        }
    }

    const result = reducer(initialState, action)
    const untouchedArea = result.filter(r => r.id === 1)[0]
    const touchedArea = result.filter(r => r.id === 2)[0]

    t.true(untouchedArea.notes.length === 0, 'Note is not added to other Area')
    t.equal(touchedArea.notes[0], note , 'Note is added to correct Area')
})

test('AREA_TAG_ADDED should add tag to specified areaId', t => {
    t.plan(2);

    const initialState = [
        {id: 1, title: 'Not touched', tags: []},
        {id: 2, title: 'Touched', tags: []}
    ]

    const tag = {
        id: 67,
        name: 'javascript'
    }

    const action = {
        type: AREA_TAG_ADDED,
        payload: {
            tag,
            areaId: 2
        }
    }

    const result = reducer(initialState, action)
    const untouchedArea = result.filter(r => r.id === 1)[0]
    const touchedArea = result.filter(r => r.id === 2)[0]

    t.true(untouchedArea.tags.length === 0, 'Tag is not added to other Area')
    t.equal(touchedArea.tags[0], tag , 'Tag is added to correct Area')
})

test('ALL_AREAS_LOADED should load areas into state', t => {
    t.plan(1)

    const initialState = [];

    const areas = [
        {id: 1, title: 'webpack', notes: []},
        {id: 2, title: 'node', notes: []},
        {id: 3, title: 'javascript', notes: [{id: 1, blurb: 'hello!'}]}
    ]

    const action = {
        type: ALL_AREAS_LOADED,
        payload: {
            areas
        }
    }

    const result = reducer(initialState, action)

    t.deepEqual(result, areas)
})

test('Unknown action doesn\'t alter state', t => {
    t.plan(1);

    const initialState = [
        {id: 1, title: 'something'}
    ]

    const result = reducer(initialState, {type: 'UNknown!???'})

    t.equal(result, initialState)
})