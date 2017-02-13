import {TAG_CREATED, ALL_TAGS_LOADED} from './actions'

const tags = (state = [], action) => {
    switch(action.type) {
        case TAG_CREATED:
            return [...state, action.payload.tag]
        case ALL_TAGS_LOADED:
            return action.payload.tags
        default:
            return state;
    }
}

export default tags;