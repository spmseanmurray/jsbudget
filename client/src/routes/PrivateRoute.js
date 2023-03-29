import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import useUserStore from '../store/user';
import useBudgetStore from '../store/budget';
import useCategoriesStore from '../store/categories';
import Header from '../components/Header';
import BudgetModal from '../components/modal/BudgetModal/BudgetModal';

function PrivateRoute({ component: Component, path }) {
  const { user, fetchUser } = useUserStore((s) => ({ user: s.user, fetchUser: s.fetchUser }));
  const { budget, fetchBudget } = useBudgetStore((s) => (
    { budget: s.budget, fetchBudget: s.fetchBudget }
  ));
  const { categories, fetchCategories } = useCategoriesStore((s) => (
    { categories: s.categories, fetchCategories: s.fetchCategories }
  ));
  const sessionId = Cookies.get('jsbudget-session');

  if (sessionId) {
    if (!user) fetchUser();
    if (budget.length === 0) fetchBudget();
    if (categories.length === 0) fetchCategories();

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
