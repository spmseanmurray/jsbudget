import React from 'react';
import { useBudgetModalState } from '../../../../contexts/BudgetModalContext';
import { useModal } from '../../../../contexts/ModalContext';

function EditTransactionHeader() {
  const budgetModal = useBudgetModalState();
  const [modal, setModal] = useModal();

  return (
    <div className="card-title flex justify-between">
      <div className="flex flex-row gap-2">
        <h3 className={`text-lg font-bold ${budgetModal.type === 'expense' ? 'text-error' : 'text-success'}`}>{`Edit ${budgetModal.type === 'expense' ? 'Expense' : 'Income'} Transaction`}</h3>
      </div>
      <button type="button" className="btn btn-sm btn-circle" onClick={() => setModal({ ...modal, budget: false })}>✕</button>
    </div>
  );
}

export default EditTransactionHeader;
