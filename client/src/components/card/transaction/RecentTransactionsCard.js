import React, { useEffect, useState } from 'react';
import Transaction from './Transaction';
import useBudgetStore from '../../../store/budget';

function RecentTransactionsCard() {
  const budget = useBudgetStore((s) => s.budget);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(budget.slice(0, 7));
  }, [budget]);

  return (
    <div className="flex flex-grow justify-center">
      <div className="card card-compact bg-neutral w-96 h-min">
        <div className="card-body">
          <div className="card-title text-secondary">Recent Transactions</div>
          { transactions.map((ele) => <Transaction key={ele.id} budgetItem={ele} />)}
        </div>
      </div>
    </div>
  );
}

export default RecentTransactionsCard;
