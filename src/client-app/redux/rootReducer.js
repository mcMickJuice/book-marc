import bookmark from './bookmark/reducer'
import user from './user/reducer'
import tags from './tag/reducer'
import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'

export default combineReducers({
    bookmark,
    routing,
    user,
    tags
})