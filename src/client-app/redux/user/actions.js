import * as authClient from '../../common/authClient'
import {push} from 'react-router-redux'


export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

const loadUser = user => {
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

export const logIn = (username, password) => {
    return dispatch => {
        return authClient.login(username, password)
            .then((user) => {
                dispatch(loadUser(user))
                dispatch(push('/'))
            })
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