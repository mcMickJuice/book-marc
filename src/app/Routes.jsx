import React, {PropTypes} from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import Main from './components/Main'
import Home from './components/Home'
import AddBookmark from './components/AddBookmark'
import ViewBookmark from './components/ViewBookmark'
import EditBookmark from './components/EditBookmark'

const NotFound = () => {
    return <div>
        Route not found
    </div>
}

const Routes = ({history}) => {
    return <Router history={history}>
        <Route path="/" component={Main}>
            <IndexRoute component={Home} />
            <Route path="bookmark">
                <IndexRoute component={AddBookmark} />
                <Route path=":id">
                    <IndexRoute component={ViewBookmark} />
                    <Route path="edit" component={EditBookmark} /> 
                </Route>
                <Route path="*" component={NotFound} />
            </Route>

        </Route>

    </Router>
}

Routes.propTypes = {
    history: PropTypes.object.isRequired
}

export default Routes;