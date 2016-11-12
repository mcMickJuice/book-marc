import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader';
import configureStore from './app/redux/configureStore'
import Root from './app/Root'
import './site'

const mount = document.getElementById('mount');
const store = configureStore();

render(<AppContainer>
    <Root store={store}/>
</AppContainer>, mount)


if (module.hot) {
    module.hot.accept('./app/Root', () => {
        const NextRoot = require('./app/Root').default;
        render(<AppContainer>
            <NextRoot store={store} />
        </AppContainer>, mount)
    })
}