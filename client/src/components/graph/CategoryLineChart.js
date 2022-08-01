import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';
import { useBudgetState } from '../../contexts/BudgetContext';

const sumBudgetByMonth = (budget) => budget.reduce((res, curr) => {
  const labelIndex = res.findIndex(({ label }) => label === moment(curr.budgetDate).format('MMM, YYYY'));

  if (labelIndex !== -1) {
    res[labelIndex].total += curr.budgetAmount;
  } else {
    res.push({
      total: curr.budgetAmount,
      label: moment(curr.budgetDate).format('MMM, YYYY'),
    });
  }
  return res;
}, []).reverse();

function CategoryLineChart() {
  const { expense, income } = useBudgetState();
  const [data, setData] = useState();
  const [category, setCategory] = useState('expense');

  useEffect(() => {
    console.log(sumBudgetByMonth(expense));
    setData(sumBudgetByMonth(expense));
  }, [category, expense, income]);

  return (
    <div className="w-96 h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          dataKey="total"
          nameKey="label"
          margin={{
            top: 10, bottom: 150, right: 20, left: 10,
          }}
        >
          <XAxis dataKey="label" interval={0} angle="90" dy={40} dx={5} />
          <YAxis dataKey="total" />
          <Line dataKey="total" />
        </LineChart>
      </ResponsiveContainer>
    </div>

  );
}
export default CategoryLineChart;
