import superagent from 'superagent'
import promisePlugin from 'superagent-promise-plugin'
// import es6Promise from 'es6-promise'

// promisePlugin.Promise = es6Promise;

const request = promisePlugin.patch(superagent);

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

