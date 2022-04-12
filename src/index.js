import React from "react";
import App from './App'; 
import { Provider } from 'react-redux' ; 
import { render } from 'react-dom'; 
import store from './store/store'; 
import Login from './Containers/Login';

import '../assets/css/styles.scss'

render(
    <Provider store={store}>
      <Login />
    </Provider>,
    document.getElementById('root')
);