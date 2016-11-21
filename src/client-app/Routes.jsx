import React, {PropTypes} from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import Main from './components/Main'
import Home from './components/Home'
import AddBookmark from './components/AddBookmark'
import ViewBookmark from './components/ViewBookmark'
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
        <Route path="/" component={Main}>
            <IndexRoute component={Home} onEnter={authHook} />
            <Route path="login" component={Login} />
            <Route path="bookmark" onEnter={authHook}>
                <IndexRoute component={AddBookmark} />
                <Route path=":id">
                    <IndexRoute component={viewBookmarkWrapped} />
                </Route>
            </Route>
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
}

Routes.propTypes = {
    history: PropTypes.object.isRequired
}

export default Routes;