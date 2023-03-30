import React from 'react';
import moment from 'moment';
import useBudgetModalStore from '../../../../store/budgetModal';
import useBudgetStore from '../../../../store/budget';
import useCategoriesStore from '../../../../store/categories';

function NewTransactionFooter() {
  const addBudgetItem = useBudgetStore((s) => s.addBudgetItem);
  const categories = useCategoriesStore((s) => s.categories);
  const { budgetModal, resetBudgetModal } = useBudgetModalStore((s) => (
    { budgetModal: s.budgetModal, resetBudgetModal: s.resetBudgetModal }
  ));

  const handleSubmit = () => {
    console.log(budgetModal.subcategory);
    const payload = {
      type: budgetModal.type,
      description: budgetModal.description,
      amount: budgetModal.amount,
      date: moment(budgetModal.date).format('yyyy-MM-DD'),
      categoryId: categories.find((cat) => cat.category === budgetModal.category).id,
      subcategoryId: categories
        .find((cat) => cat.category === budgetModal.category)?.subcategories
        .find((subcat) => subcat.subcategory === budgetModal.subcategory)?.id,
    };

    addBudgetItem(payload);
    resetBudgetModal();
  };
  return (
    <div className="modal-action">
      <button type="submit" className="btn btn-primary btn-block" onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}

export default NewTransactionFooter;
