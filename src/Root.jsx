import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './reset.css';

import App from './App.jsx';

import nodeBotApp from './redux';

const reducers = nodeBotApp;
const middleware = [thunk];

const store = createStore(reducers, applyMiddleware(...middleware));

const Root = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

export default Root;
