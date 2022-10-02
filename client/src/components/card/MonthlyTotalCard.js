import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useBudgetState } from '../../contexts/BudgetContext';
import TotalStat from '../stat/TotalStat';
import { calculateTotal } from '../../utils/calculations';

function MonthlyTotalCard() {
  const { expense, income } = useBudgetState();
  const [total, setTotal] = useState({
    expense: 0, income: 0, saving: 0, lastExpense: 0, lastIncome: 0,
  });
  const monthStart = moment().startOf('month');
  const monthEnd = moment().endOf('month');
  const lastMonthStart = moment().subtract(1, 'month').startOf('month');
  const thisDayLastMonth = moment().subtract(1, 'month').endOf('day');

  useEffect(() => {
    const expenseTotal = calculateTotal(expense, monthStart, monthEnd);
    const incomeTotal = calculateTotal(income, monthStart, monthEnd);
    const savingTotal = ((incomeTotal - expenseTotal) / incomeTotal) * 100;

    const lastExpenseTotal = calculateTotal(expense, lastMonthStart, thisDayLastMonth);
    const lastIncomeTotal = calculateTotal(income, lastMonthStart, thisDayLastMonth);

    setTotal({
      expense: expenseTotal,
      income: incomeTotal,
      saving: savingTotal.toFixed(0),
      lastExpense: lastExpenseTotal,
      lastIncome: lastIncomeTotal,
    });
  }, [expense, income]);

  return (
    <div className="flex flex-grow justify-center">
      <div className="card card-compact bg-neutral w-96 h-min">
        <div className="card-body">
          <div className="flex flex-row justify-between">
            <div className="card-title text-secondary">This Month</div>
            {total.saving > 0
              ? <div className="radial-progress text-success" style={{ '--value': total.saving, '--size': '3rem' }}>{`${total.saving}%`}</div>
              : null}
          </div>
          <div className="stats">
            <TotalStat title="Income" total={total.income} type="income" relativeTotal={total.income - total.lastIncome} />
            <TotalStat title="Expenses" total={total.expense} type="expense" relativeTotal={total.expense - total.lastExpense} />
          </div>
        </div>
      </div>
    </div>

  );
}

export default MonthlyTotalCard;
