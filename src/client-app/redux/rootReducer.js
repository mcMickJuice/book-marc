import bookmark from './bookmark/reducer'
import user from './user/reducer'
import tag from './tag/reducer'
import area from './area/reducer'
import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'

export default combineReducers({
    bookmark,
    routing,
    user,
    tag,
    area
})