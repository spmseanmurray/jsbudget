import moment from 'moment';
import React, { useState, useEffect } from 'react';
import useBudgetStore from '../../store/budget';
import TotalStat from '../stat/TotalStat';
import { calculateTotal } from '../../utils/calculations';

function YearlyTotalCard() {
  const { expense, income } = useBudgetStore((s) => ({ expense: s.expense, income: s.income }));
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
    <div className="flex flex-grow justify-center">
      <div className="card card-compact bg-neutral w-96 h-fit">
        <div className="card-body">
          <div className="flex flex-row justify-between">
            <div className="card-title text-secondary">This Year</div>
            {total.saving > 0
              ? <div className="radial-progress text-success" style={{ '--value': total.saving, '--size': '3rem' }}>{`${total.saving}%`}</div>
              : null}
          </div>
          <div className="stats">
            <TotalStat title="Income" total={total.income} type="income" />
            <TotalStat title="Expenses" total={total.expense} type="expense" />
          </div>
        </div>
      </div>
    </div>

  );
}

export default YearlyTotalCard;
