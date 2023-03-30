import React from 'react';
import BudgetSelectType from '../../../button/BudgetSelectType';
import usePageStore from '../../../../store/page';

function NewTransactionHeader() {
  const toggleModal = usePageStore((s) => s.toggleModal);

  return (
    <div className="card-title">
      <div className="flex flex-grow flex-col gap-2">
        <div className="flex flex-row flex-grow justify-between">
          <h3 className="text-lg font-bold">Add a New Transaction</h3>
          <button type="button" className="btn btn-sm btn-circle btn-primary" onClick={toggleModal}>✕</button>
        </div>
        <BudgetSelectType />
      </div>

    </div>
  );
}

export default NewTransactionHeader;
