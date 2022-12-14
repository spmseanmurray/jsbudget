import React from 'react';
import { useBudgetModal } from '../../../../contexts/BudgetModalContext';
import { useBudgetActions } from '../../../../contexts/BudgetContext';
import { useUserState } from '../../../../contexts/UserContext';

function NewTransactionFooter() {
  const { addBudget } = useBudgetActions();
  const [budgetModal, budgetModalActions] = useBudgetModal();
  const user = useUserState();

  const handleSubmit = () => {
    const payload = {
      budgetType: budgetModal.type,
      budgetDescription: budgetModal.description,
      budgetAmount: budgetModal.amount,
      budgetDate: budgetModal.date,
      budgetCategory: budgetModal.category,
      budgetSubcategory: budgetModal.subcategory,
      _userId: user._id,
    };

    addBudget(payload);
    budgetModalActions.resetBudgetModal();
  };
  return (
    <div className="modal-action">
      <button type="submit" className="btn btn-primary btn-block" onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}

export default NewTransactionFooter;
