import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';
import History from '../pages/History';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" render={() => (<Login />)} />
      <Route exact path="/register" render={() => (<Register />)} />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/history" component={History} />
    </Switch>
  );
}

export default Routes;
