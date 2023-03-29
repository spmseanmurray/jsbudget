import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import useUserStore from '../store/user';
import useBudgetStore from '../store/budget';
import useCategoriesStore from '../store/categories';

function Header() {
  const logout = useUserStore((s) => s.logout);
  const resetBudget = useBudgetStore((s) => s.resetBudget);
  const resetCategories = useCategoriesStore((s) => s.resetCategories);
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    resetBudget();
    resetCategories();

    history.push('/login');
  };

  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="navbar-start">
        <button type="button" className="btn btn-ghost normal-case text-xl" onClick={() => history.push('./')}>
          <div className="text-primary font-bold">JS</div>
          Budget
        </button>
      </div>
      <div className="navbar-end">
        <button type="button" className="btn btn-ghost" onClick={() => history.push('./history')}>Transaction History</button>
        <button type="button" className="btn btn-ghost" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
        </button>
      </div>
    </div>
  );
}

export default Header;
