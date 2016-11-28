import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import Routes from './Routes'
import SiteStyles from './components/SiteStyles'
import * as css from './styles/site'

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

// export default SiteStyles