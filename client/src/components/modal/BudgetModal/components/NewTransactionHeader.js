import React from 'react';
import BudgetSelectType from '../../../button/BudgetSelectType';
import { useModal } from '../../../../contexts/ModalContext';

function NewTransactionHeader() {
  const [modal, setModal] = useModal();

  return (
    <div className="card-title flex justify-between">
      <div className="flex flex-row gap-2">
        <h3 className="text-lg font-bold">Add a New Transaction</h3>
        <BudgetSelectType />
      </div>
      <button type="button" className="btn btn-sm btn-circle" onClick={() => setModal({ ...modal, budget: false })}>✕</button>
    </div>
  );
}

export default NewTransactionHeader;
