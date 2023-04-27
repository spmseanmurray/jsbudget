import moment from 'moment';
import React from 'react';

function TransactionCard({ budgetItem = {} }) {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="font-bold justify-self-start">{budgetItem.description}</h2>
        <div className={`badge badge-outline self-center ${budgetItem.type === 'income' ? 'bg-success text-success-content' : 'bg-error text-error-content'}`}>
          {`${budgetItem.type === 'income' ? '+' : '-'}${((budgetItem.amount.toFixed(2)) || 0)}`}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>{`${budgetItem.category.category}${budgetItem.subcategory.subcategory ? ` - ${budgetItem.subcategory.subcategory}` : ''}`}</div>
        <div>{moment(budgetItem.date).format('MMMM D, YYYY')}</div>
      </div>
    </div>
  );
}

export default TransactionCard;