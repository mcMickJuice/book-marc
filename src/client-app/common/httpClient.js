import superagent from 'superagent'
import promisePlugin from 'superagent-promise-plugin'
import {getToken} from './authClient'

const request = promisePlugin.patch(superagent);

const authRequest = method => {
    return (...args) => {
        const token = getToken();
        return method(...args, {
            'authorization': `Bearer ${token}`
        })
    }
}

export const get = (url, headers) => {
    headers = headers || {};
    return request
    .get(url)
    .set(headers);
}

export const post = (url, body, headers) => {
    headers = headers || {};
    return request
    .post(url)
    .set(headers)
        .send(body)
}

export const put = (url, body, headers) => {
    headers = headers || {};    
    return request
    .put(url)
    .set(headers)
        .send(body)
}

export const auth = {
    get: authRequest(get),
    put: authRequest(put),
    post: authRequest(post),
}

