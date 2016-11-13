import {post} from './httpClient'
import * as webStorage from './webStorage'
import {apiUrl} from './config'

const TOKEN_KEY = 'bm_token';

export const login = (username, password) => {
    var url = `${apiUrl}/login`
    return post(url, {
        username,
        password
    })
    .then(res => {
        webStorage.setItem(TOKEN_KEY, res.token)
    })
}

export const logout = () => {
    webStorage.removeItem(TOKEN_KEY)
}

export const isAuthenticated = () => {
    const token = webStorage.getItem(TOKEN_KEY);
    //check expiration
    return token && token.length > 0;
}

export const getToken = () => {
    return webStorage.getItem(TOKEN_KEY)
}