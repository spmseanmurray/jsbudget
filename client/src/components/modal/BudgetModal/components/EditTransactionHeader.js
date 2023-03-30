import React from 'react';
import { useBudgetModalState } from '../../../../contexts/BudgetModalContext';
import usePageStore from '../../../../store/page';

function EditTransactionHeader() {
  const budgetModal = useBudgetModalState();
  const toggleModal = usePageStore((s) => s.toggleModal);

  return (
    <div className="card-title flex justify-between">
      <div className="flex flex-row gap-2">
        <h3 className={`text-lg font-bold ${budgetModal.type === 'EXPENSE' ? 'text-error' : 'text-success'}`}>{`Edit ${budgetModal.type === 'EXPENSE' ? 'Expense' : 'Income'} Transaction`}</h3>
      </div>
      <button type="button" className="btn btn-sm btn-circle" onClick={toggleModal}>✕</button>
    </div>
  );
}

export default EditTransactionHeader;
