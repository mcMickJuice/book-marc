import React, {PropTypes} from 'react'
import AddBookmark from './components/AddBookmark'
import {Provider} from 'react-redux'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import Routes from './Routes'

const Root = ({store}) => {
    const history = syncHistoryWithStore(browserHistory, store);
    return (<Provider store={store}>
        <Routes history={history} />
    </Provider>)
    
}

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root;