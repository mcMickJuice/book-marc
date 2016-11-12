import bookmark from './bookmark/reducer'
import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'

export default combineReducers({
    bookmark,
    routing
})