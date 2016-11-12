import {createStore, applyMiddleware} from 'redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

const configureStore = (defaultState = {}) => {
    const enhancers = applyMiddleware(thunk)
    return createStore(rootReducer, defaultState, enhancers)
}

export default configureStore