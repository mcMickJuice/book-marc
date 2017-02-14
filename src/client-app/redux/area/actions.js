import * as areaService from '../../common/areaService'

export const AREA_LOADED = 'AREA_LOADED'
export const ALL_AREAS_LOADED = 'ALL_AREAS_LOADED'
export const AREA_TAG_ADDED = 'AREA_TAG_ADDED'
export const AREA_NOTE_ADDED = 'AREA_NOTE_ADDED'

export const loadAllAreas = () => {
    return dispatch => {
        return areaService.getAllAreas()
            .then(areas => {
                dispatch({
                    type: ALL_AREAS_LOADED,
                    payload: {
                        areas
                    }
                })
            })
    }
}

const loadAreaAction = area => {
    return {
        type: AREA_LOADED,
        payload: {
            area
        }
    }
}

export const addArea = newArea => {
    return dispatch => {
        return areaService.createArea(newArea)
            .then(area => {
                dispatch(loadAreaAction(area))
            })
    }
}

export const getAreaById = areaId => {
    return dispatch => {
        return areaService.getAreaById(areaId)
            .then(area => {
                dispatch(loadAreaAction(area))
            })
    }
}

const loadAreaNoteAction = note => {
    return {
        type: AREA_NOTE_ADDED,
        payload: {
            note
        }
    }
}

export const addAreaNote = (note) => {
    return dispatch => {
        return areaService.createAreaNote(note)
            .then(createdNote => {
                dispatch(loadAreaNoteAction(createdNote))
            })
    }
}
