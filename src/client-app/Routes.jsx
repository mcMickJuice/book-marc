import React, {PropTypes} from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import Main from './components/Main'
import Home from './components/home/Home'
import AreaHome from './components/area/AreaHome'
import AddArea from './components/area/AddArea'
import AreaView from './components/area/AreaView'
import BookmarkHome from './components/bookmark/BookmarkHome'
import AddBookmark from './components/bookmark/AddBookmark'
import ViewBookmark from './components/bookmark/ViewBookmark'
import Login from './components/Login'
import {isAuthenticated} from './common/authClient'
import requireBookmark from './hocs/requireBookmark'

const NotFound = () => {
    return <div>
        Route not found
    </div>
}

const authHook = (nextState, replace) => {
    if(!isAuthenticated()) {
        replace('/login')
        return false;
    }
    return true;
}

const viewBookmarkWrapped = requireBookmark(ViewBookmark)

const Routes = ({history}) => {
    return <Router history={history}>
        <Route path="/login" component={Login} />
        <Route path="/" component={Main} onEnter={authHook}>
            <IndexRoute component={Home} />
            <Route path="bookmark">
                <IndexRoute component={BookmarkHome} />
                <Route path="add" component={AddBookmark} />
                <Route path=":id">
                    <IndexRoute component={viewBookmarkWrapped} />
                </Route>
            </Route>
            <Route path="area">
                <IndexRoute component={AreaHome} />
                <Route path="add" component={AddArea}/>
                <Route path=":id" component={AreaView}/>
            </Route>
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
}

Routes.propTypes = {
    history: PropTypes.object.isRequired
}

export default Routes;