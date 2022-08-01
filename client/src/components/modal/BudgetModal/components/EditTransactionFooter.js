import React from 'react';
import { useBudgetModal } from '../../../../contexts/BudgetModalContext';
import { useBudgetActions } from '../../../../contexts/BudgetContext';
import { useModal } from '../../../../contexts/ModalContext';

function EditTransactionFooter() {
  const { updateBudget, removeBudget } = useBudgetActions();
  const [modal, setModal] = useModal();
  const [budgetModal, budgetModalActions] = useBudgetModal();

  const handleUpdate = () => {
    const payload = {
      budgetType: budgetModal.type,
      budgetDescription: budgetModal.description,
      budgetAmount: budgetModal.amount,
      budgetDate: budgetModal.date,
      budgetCategory: budgetModal.category,
      budgetSubcategory: budgetModal.subcategory,
    };

    updateBudget(budgetModal.id, payload);
    budgetModalActions.resetBudgetModal();
    setModal({ ...modal, budget: false });
  };

  const handleDelete = () => {
    removeBudget(budgetModal.id);
    budgetModalActions.resetBudgetModal();
    setModal({ ...modal, budget: false });
  };
  return (
    <div className="modal-action">
      <div className="flex flex-grow flex-row justify-between">
        <button type="submit" className="btn btn-primary w-1/4" onClick={() => handleDelete()}>Delete</button>
        <button type="submit" className="btn btn-primary w-1/4" onClick={() => handleUpdate()}>Update</button>
      </div>
    </div>
  );
}

export default EditTransactionFooter;
