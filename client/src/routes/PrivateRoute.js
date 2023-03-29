import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import BudgetModal from '../components/modal/BudgetModal/BudgetModal';

function PrivateRoute({ component: Component, path }) {
  const sessionId = Cookies.get('jsbudget-session');
  if (sessionId) {
    const privateComponent = (
      <div className="flex flex-grow flex-col">
        <BudgetModal />
        <Header />
        <Component />
      </div>
    );
    return (
      <Route exact path={path} render={() => privateComponent} />
    );
  }

  return (
    <Route exact path={path} render={() => <Redirect to="/login" />} />
  );
}

export default PrivateRoute;
