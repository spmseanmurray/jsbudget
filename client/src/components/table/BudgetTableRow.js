import React from 'react';
import moment from 'moment';
import { useBudgetModalActions } from '../../contexts/BudgetModalContext';
import { useModal } from '../../contexts/ModalContext';

function BudgetTableRow({ budgetItem }) {
  const budgetModalActions = useBudgetModalActions();
  const [modal, setModal] = useModal();

  const handleClick = () => {
    budgetModalActions.setBudgetModal(budgetItem);
    setModal({ ...modal, budget: true });
  };

  return (
    <tr className="hover w-full" onClick={handleClick}>
      <td className="bg-neutral bg-opacity-50 w-full">{moment(budgetItem.budgetDate).format('MMMM D, YYYY')}</td>
      <td className="bg-neutral bg-opacity-50 w-full">{budgetItem.budgetDescription}</td>
      <td className="bg-neutral bg-opacity-50 w-full">
        <div className="badge">{budgetItem.budgetCategory}</div>
      </td>
      <td className="bg-neutral bg-opacity-50 w-full">
        {budgetItem.budgetSubcategory ? <div className="badge">{budgetItem.budgetSubcategory}</div> : null}
      </td>
      <td className="bg-neutral bg-opacity-50 w-full">
        {budgetItem.budgetType === 'income'
          ? (
            <div className="font-bold text-success">
              {`+${budgetItem.budgetAmount.toFixed(2)}`}
            </div>
          )
          : (
            <div className="font-bold text-error">
              {`-${budgetItem.budgetAmount.toFixed(2)}`}
            </div>
          )}

      </td>
    </tr>
  );
}

export default BudgetTableRow;
