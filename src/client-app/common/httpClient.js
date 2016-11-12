import superagent from 'superagent'
import promisePlugin from 'superagent-promise-plugin'
// import es6Promise from 'es6-promise'

// promisePlugin.Promise = es6Promise;

const request = promisePlugin.patch(superagent);

export const get = url => {
    return request.get(url);
}

export const post = (url, body) => {
    return request.post(url)
        .send(body)
}

export const put = (url, body) => {
    return request.put(url)
        .send(body)
}

