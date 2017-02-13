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

