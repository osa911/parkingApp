import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App/index';
import HomePage from './containers/HomePage/index';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
  </Route>
);
