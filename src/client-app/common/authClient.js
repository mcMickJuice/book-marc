import { post } from './httpClient'
import * as webStorage from './webStorage'
import { apiUrl } from './config'
import decode from 'jwt-decode'

const TOKEN_KEY = 'bm_token';

export const login = (username, password) => {
    var url = `${apiUrl}/login`
    return post(url, {
        username,
        password
    })
        .then(({body}) => {
            var token = body.token;
            webStorage.setItem(TOKEN_KEY, token)
            return decode(token)
        })
}

export const logout = () => {
    return new Promise(resolve => {
        webStorage.removeItem(TOKEN_KEY)
        resolve();
    })
}

export const isAuthenticated = () => {
    const token = webStorage.getItem(TOKEN_KEY);
    //check expiration
    return token && token.length > 0;
}

export const getUser = () => {
    const token = getToken();

    if(token) {
        return decode(token)
    } 

     return null
}

export const getToken = () => {
    return webStorage.getItem(TOKEN_KEY)
}