import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useBudgetState } from '../../contexts/BudgetContext';
import TotalStat from '../stat/TotalStat';
import { calculateTotal } from '../../utils/calculations';

function YearlyTotalCard() {
  const { expense, income } = useBudgetState();
  const [total, setTotal] = useState({ expense: 0, income: 0, saving: 0 });
  const yearStart = moment().startOf('year');
  const yearEnd = moment().endOf('year');

  useEffect(() => {
    const expenseTotal = calculateTotal(expense, yearStart, yearEnd);
    const incomeTotal = calculateTotal(income, yearStart, yearEnd);
    const savingTotal = ((incomeTotal - expenseTotal) / incomeTotal) * 100;
    setTotal({
      expense: expenseTotal,
      income: incomeTotal,
      saving: savingTotal.toFixed(0),
    });
  }, [expense, income]);

  return (
    <div className="card card-compact bg-neutral w-96">
      <div className="card-body">
        <div className="flex flex-row justify-between">
          <div className="card-title text-secondary">This Year</div>
          <div className="radial-progress text-success" style={{ '--value': total.saving, '--size': '3rem' }}>{`${total.saving}%`}</div>
        </div>
        <div className="stats">
          <TotalStat title="Income" total={total.income} type="income" start={yearStart} end={yearEnd} />
          <TotalStat title="Expenses" total={total.expense} type="expense" start={yearStart} end={yearEnd} />
        </div>
      </div>
    </div>

  );
}

export default YearlyTotalCard;
