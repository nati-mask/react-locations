import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

const RootContainer = require('./components/RootContainer.jsx');

const store = require('./store');

window.app_store = store;

module.exports = render(

    <Provider store={store}>
        <RootContainer />
    </Provider>, document.getElementById('root')

);
