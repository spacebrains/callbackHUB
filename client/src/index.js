import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import App from './App/App';
import storeFactory from './store/index'


const store=storeFactory();

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);