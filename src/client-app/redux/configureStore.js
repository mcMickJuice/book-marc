import { createStore, applyMiddleware } from 'redux'
import {browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'



const configureStore = (defaultState = {}) => {
    const enhancers = applyMiddleware(thunk, routerMiddleware(browserHistory))
    var store = createStore(rootReducer, defaultState, enhancers)
    if (process.env.NODE_ENV === 'development') {
        window._store = store;
    }
    return store;
}

export default configureStore