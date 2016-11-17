import * as authClient from '../../common/authClient'
import {push} from 'react-router-redux'


export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

const loadUserAction = user => {
    return {
        type: USER_LOGGED_IN,
        payload: {
            user
        }
    }
}

const resetUser = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const logIn = userInfo => {
    return dispatch => {
        dispatch(loadUserAction(userInfo));
        dispatch(push('/'))
    }
}

export const logOut = () => {
    return dispatch => {
        return authClient.logout()
            .then(() => {
                dispatch(resetUser())
                dispatch(push('/'))
            })
    }
}