import {apiUrl} from './config'

export const createUrl = route => `${apiUrl}/${route}`;
export const responseHandler = resp => resp.body
