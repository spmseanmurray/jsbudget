import React from 'react';
import { useBudgetModal } from '../../../../contexts/BudgetModalContext';
import useBudgetStore from '../../../../store/budget';
import { useModal } from '../../../../contexts/ModalContext';

function EditTransactionFooter() {
  const { updateBudgetItem, removeBudgetItem } = useBudgetStore((s) => (
    { updateBudgetItem: s.updateBudgetItem, removeBudgetItem: s.removeBudgetItem }
  ));
  const [modal, setModal] = useModal();
  const [budgetModal, budgetModalActions] = useBudgetModal();

  const handleUpdate = () => {
    const payload = {
      type: budgetModal.type,
      description: budgetModal.description,
      amount: budgetModal.amount,
      date: budgetModal.date,
      category: budgetModal.category,
      subcategory: budgetModal.subcategory,
    };

    updateBudgetItem(budgetModal.id, payload);
    budgetModalActions.resetBudgetModal();
    setModal({ ...modal, budget: false });
  };

  const handleDelete = () => {
    removeBudgetItem(budgetModal.id);
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
