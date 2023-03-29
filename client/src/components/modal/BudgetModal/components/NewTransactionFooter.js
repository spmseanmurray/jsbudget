import React from 'react';
import { useBudgetModal } from '../../../../contexts/BudgetModalContext';
import useBudgetStore from '../../../../store/budget';
import useUserStore from '../../../../store/user';

function NewTransactionFooter() {
  const addBudgetItem = useBudgetStore((s) => s.addBudgetItem);
  const [budgetModal, budgetModalActions] = useBudgetModal();
  const user = useUserStore((s) => s.user);

  const handleSubmit = () => {
    const payload = {
      type: budgetModal.type,
      description: budgetModal.description,
      amount: budgetModal.amount,
      date: budgetModal.date,
      category: budgetModal.category,
      subcategory: budgetModal.subcategory,
      userId: user.id,
    };

    addBudgetItem(payload);
    budgetModalActions.resetBudgetModal();
  };
  return (
    <div className="modal-action">
      <button type="submit" className="btn btn-primary btn-block" onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}

export default NewTransactionFooter;
