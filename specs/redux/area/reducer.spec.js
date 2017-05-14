const reducer = require('redux/area/reducer').default
const {AREA_LOADED,
    AREA_NOTE_ADDED,
    ALL_AREAS_LOADED,
    AREA_TAG_ADDED,
    AREA_TAG_REMOVED} = require('redux/area/actions')

test('AREA_LOADED should add area to state', () => {
    expect.assertions(2)

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

    expect(result.length).toBe(1)
    expect(result[0]).toBe(area)
})

test('AREA_NOTE_ADDED should add note to specified areaId', () => {
    expect.assertions(2);

    const initialState = [
        { id: 1, title: 'Not touched', notes: [] },
        { id: 2, title: 'Touched', notes: [] }
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

    expect(untouchedArea.notes.length === 0).toBeTruthy()
    expect(touchedArea.notes[0]).toBe(note)
})

test('AREA_TAG_ADDED should add tag to specified areaId', () => {
    expect.assertions(2);

    const initialState = [
        { id: 1, title: 'Not touched', tags: [] },
        { id: 2, title: 'Touched', tags: [] }
    ]

    const action = {
        type: AREA_TAG_ADDED,
        payload: {
            tagId: 67,
            areaId: 2
        }
    }

    const result = reducer(initialState, action)
    const untouchedArea = result.filter(r => r.id === 1)[0]
    const touchedArea = result.filter(r => r.id === 2)[0]

    expect(untouchedArea.tags.length === 0).toBeTruthy()
    expect(touchedArea.tags[0]).toBe(67)
})

test('AREA_TAG_ADDED should create tags and add tag if no tag array exists', () => {
    expect.assertions(2);

    const initialState = [
        {id: 1}
    ]

    const action = {
        type: AREA_TAG_ADDED,
        payload: {
            areaId: 1,
            tagId: 70
        }
    }

    const result = reducer(initialState, action)

    expect(result[0].tags != null).toBeTruthy()
    expect(result[0].tags[0]).toBe(70)
})

test('AREA_TAG_REMOVED should remove tagId from specified area', () => {
    expect.assertions(1);

    const initialState = [
        {id: 1, tags: [100]}
    ]

    const action = {
        type:AREA_TAG_REMOVED,
        payload: {
            areaId: 1,
            tagId: 100
        }
    }

    const result = reducer(initialState, action);

    expect(result[0].tags.length).toBe(0)
})

test('AREA_TAG_REMOVED should not remove tagId from other area', () => {
    expect.assertions(1);

    const initialState = [
        {id: 1, tags: [100]},
        {id: 2, tags: [100]},
    ]

    const action = {
        type:AREA_TAG_REMOVED,
        payload: {
            areaId: 1,
            tagId: 100
        }
    }

    const result = reducer(initialState, action);
    const otherArea = result.filter(area => area.id === 2)[0]

    expect(otherArea.tags[0]).toBe(100)
})

test('AREA_TAG_REMOVED should remove tagId from specified area even if array is not on area', () => {
    expect.assertions(1);

    const initialState = [
        {id: 1}
    ]

    const action = {
        type:AREA_TAG_REMOVED,
        payload: {
            areaId: 1,
            tagId: 100
        }
    }

    const result = reducer(initialState, action);

    expect(result[0].tags != null).toBeTruthy()
})

test('ALL_AREAS_LOADED should load areas into state', () => {
    expect.assertions(1)

    const initialState = [];

    const areas = [
        { id: 1, title: 'webpack', notes: [] },
        { id: 2, title: 'node', notes: [] },
        { id: 3, title: 'javascript', notes: [{ id: 1, blurb: 'hello!' }] }
    ]

    const action = {
        type: ALL_AREAS_LOADED,
        payload: {
            areas
        }
    }

    const result = reducer(initialState, action)

    expect(result).toEqual(areas)
})

test('Unknown action doesn\'t alter state', () => {
    expect.assertions(1);

    const initialState = [
        { id: 1, title: 'something' }
    ]

    const result = reducer(initialState, { type: 'UNknown!???' })

    expect(result).toBe(initialState)
})