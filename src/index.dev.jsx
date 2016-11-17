import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader';
import configureStore from './client-app/redux/configureStore'
import Root from './client-app/Root'
import './site'
import {getUser} from './client-app/common/authClient'

const user = getUser();

const mount = document.getElementById('mount');
const store = configureStore({user});

render(<AppContainer>
    <Root store={store}/>
</AppContainer>, mount)


if (module.hot) {
    module.hot.accept('./client-app/Root', () => {
        const NextRoot = require('./client-app/Root').default;
        render(<AppContainer>
            <NextRoot store={store} />
        </AppContainer>, mount)
    })
}