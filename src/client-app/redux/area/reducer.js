import {AREA_LOADED, AREA_NOTE_ADDED, ALL_AREAS_LOADED, AREA_TAG_ADDED} from './actions'

const mapTagAdded = (state, {areaId,tag}) => {
    return state.map(area => {
        if(area.id !== areaId){
            return area
        }

        const tags = [...area.tags, tag]

        return {...area, ...{tags}}
    })
}

const mapNoteAdded = (state, {areaId, note}) => {
    return state.map(area => {
        if(area.id !== areaId) {
            return area
        }

        const notes = [...area.notes, note];

        return {...area, ...{notes}}
    })
}

const areas = (state = [], action) => {
    switch (action.type) {
        case AREA_LOADED:
            return [...state, action.payload.area]
        case ALL_AREAS_LOADED:
            return action.payload.areas
        case AREA_TAG_ADDED:
            return mapTagAdded(state, action.payload)
        case AREA_NOTE_ADDED:
            return mapNoteAdded(state, action.payload)
        default:
            return state
    }
}

export default areas;