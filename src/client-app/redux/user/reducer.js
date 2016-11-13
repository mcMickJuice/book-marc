import {USER_LOGGED_IN, USER_LOGGED_OUT} from './actions'

const user = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGGED_IN:
            return Object.assign({}, state, action.payload)
        case USER_LOGGED_OUT:
        //clear out user info
            return Object.assign({}, state, {})
        default: 
            return state;
    }
}

export default user