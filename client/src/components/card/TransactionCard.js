import moment from 'moment';
import React from 'react';

function TransactionCard({ budgetItem = {} }) {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="font-bold justify-self-start">{budgetItem.budgetDescription}</h2>
        <div className={`badge badge-outline self-center ${budgetItem.budgetType === 'income' ? 'bg-success text-success-content' : 'bg-error text-error-content'}`}>
          {`${budgetItem.budgetType === 'income' ? '+' : '-'}${((budgetItem.budgetAmount) || 0).toFixed(2)}`}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>{`${budgetItem.budgetCategory}${budgetItem.budgetSubcategory ? ` - ${budgetItem.budgetSubcategory}` : ''}`}</div>
        <div>{moment(budgetItem.budgetDate).format('MMMM D, YYYY')}</div>
      </div>
    </div>
  );
}

export default TransactionCard;
