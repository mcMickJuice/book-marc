import {
    AREA_LOADED,
    AREA_NOTE_ADDED,
    ALL_AREAS_LOADED,
    AREA_TAG_ADDED,
    AREA_TAG_REMOVED
} from './actions'

const mapTagAdded = (state, areaId, tagId) => {
    return state.map(area => {
        if (area.id !== areaId) {
            return area
        }

        const tags = [...(area.tags || []), tagId]

        return { ...area, ...{ tags } }
    })
}

const mapTagRemoved = (state, areaId, tagId) => {
    return state.map(area => {
        if(area.id !== areaId){
            return area
        }

        const tags = (area.tags || []).filter(t => t !== tagId);

        return {...area, ...{tags}}

    });
}

const mapNoteAdded = (state, note) => {
    return state.map(area => {
        if (area.id !== note.areaId) {
            return area
        }

        const notes = [...area.notes, note];

        return { ...area, ...{ notes } }
    })
}

const area = (state = [], action) => {
    switch (action.type) {
        case AREA_LOADED:
            return [...state, action.payload.area]
        case ALL_AREAS_LOADED:
            return action.payload.areas
        case AREA_TAG_ADDED:
            return mapTagAdded(state, action.payload.areaId, action.payload.tagId)
        case AREA_TAG_REMOVED:
            return mapTagRemoved(state, action.payload.areaId, action.payload.tagId)
        case AREA_NOTE_ADDED:
            return mapNoteAdded(state, action.payload.note)
        default:
            return state
    }
}

export default area;