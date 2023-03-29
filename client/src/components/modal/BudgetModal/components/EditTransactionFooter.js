import React from 'react';
import moment from 'moment';
import { useBudgetModal } from '../../../../contexts/BudgetModalContext';
import useBudgetStore from '../../../../store/budget';
import useCategoriesStore from '../../../../store/categories';
import { useModal } from '../../../../contexts/ModalContext';

function EditTransactionFooter() {
  const { updateBudgetItem, deleteBudgetItem } = useBudgetStore((s) => (
    { updateBudgetItem: s.updateBudgetItem, deleteBudgetItem: s.deleteBudgetItem }
  ));
  const categories = useCategoriesStore((s) => s.categories);
  const [modal, setModal] = useModal();
  const [budgetModal, budgetModalActions] = useBudgetModal();

  const handleUpdate = () => {
    const payload = {
      type: budgetModal.type,
      description: budgetModal.description,
      amount: budgetModal.amount,
      date: moment(budgetModal.date).format('yyyy-MM-DD'),
      categoryId: categories.find((cat) => cat.category === budgetModal.category).id,
      subcategoryId: categories
        .find((cat) => cat.category === budgetModal.category).subcategories
        .find((subcat) => subcat.subcategory === budgetModal.subcategory).id,
    };

    updateBudgetItem(payload, budgetModal.id);
    budgetModalActions.resetBudgetModal();
    setModal({ ...modal, budget: false });
  };

  const handleDelete = () => {
    deleteBudgetItem(budgetModal.id);
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
