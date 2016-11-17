import React from 'react'
import {render} from 'react-dom'
import configureStore from './client-app/redux/configureStore'
import Root from './client-app/Root'
import './site'
import {getUser} from './client-app/common/authClient'

const mount = document.getElementById('mount');

var user = getUser();

const store = configureStore({user});


render(<Root store={store} />, mount)