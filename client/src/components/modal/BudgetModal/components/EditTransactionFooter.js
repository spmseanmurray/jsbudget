import React from 'react';
import moment from 'moment';
import useBudgetModalStore from '../../../../store/budgetModal';
import useBudgetStore from '../../../../store/budget';
import useCategoriesStore from '../../../../store/categories';
import usePageStore from '../../../../store/page';

function EditTransactionFooter() {
  const { updateBudgetItem, deleteBudgetItem } = useBudgetStore((s) => (
    { updateBudgetItem: s.updateBudgetItem, deleteBudgetItem: s.deleteBudgetItem }
  ));
  const categories = useCategoriesStore((s) => s.categories);
  const toggleModal = usePageStore((s) => s.toggleModal);

  const { budgetModal, resetBudgetModal } = useBudgetModalStore((s) => (
    { budgetModal: s.budgetModal, resetBudgetModal: s.resetBudgetModal }
  ));

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
    resetBudgetModal();
    toggleModal('budget');
  };

  const handleDelete = () => {
    deleteBudgetItem(budgetModal.id);
    resetBudgetModal();
    toggleModal('budget');
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
