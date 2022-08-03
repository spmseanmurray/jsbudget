import React, { useEffect, useState } from 'react';
import TransactionCard from './TransactionCard';
import { useBudgetState } from '../../contexts/BudgetContext';

function RecentTransactionsCard() {
  const { budget } = useBudgetState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(budget.slice(0, 7));
  }, [budget]);

  return (
    <div className="flex flex-grow justify-center">
      <div className="card card-compact bg-neutral w-96 h-min">
        <div className="card-body">
          <div className="card-title text-secondary">Recent Transactions</div>
          { transactions.map((ele) => <TransactionCard key={ele._id} budgetItem={ele} />)}
        </div>
      </div>
    </div>
  );
}

export default RecentTransactionsCard;
