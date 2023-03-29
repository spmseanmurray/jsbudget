import React from 'react';
import { faCreditCard, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useBudgetModal } from '../../contexts/BudgetModalContext';

function BudgetSelectType() {
  const [budgetModal, budgetModalActions] = useBudgetModal();

  return (
    <button type="button" className="btn btn-sm" onClick={() => budgetModalActions.setType(budgetModal.type === 'EXPENSE' ? 'INCOME' : 'EXPENSE')}>
      {budgetModal.type === 'EXPENSE'
        ? (
          <div className="flex flex-row justify-center items-center gap-3">
            <FontAwesomeIcon className="swap-off text-error" size="xl" icon={faCreditCard} />
            <div>Expense</div>
          </div>
        )
        : (
          <div className="flex flex-row justify-center items-center gap-3">
            <FontAwesomeIcon className="swap-on text-success" size="xl" icon={faPiggyBank} />
            <div>Income</div>
          </div>
        )}
    </button>
  );
}
export default BudgetSelectType;
