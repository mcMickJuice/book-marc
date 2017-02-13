import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'



const configureStore = (defaultState = {}) => {
    const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    const enhancers = composeEnhancers(applyMiddleware(thunk, routerMiddleware(browserHistory)))
    var store = createStore(rootReducer, defaultState, enhancers)

    return store;
}

export default configureStore