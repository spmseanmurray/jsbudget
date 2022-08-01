import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, ReferenceLine, Tooltip, Label, YAxis,
} from 'recharts';
import { useBudgetState } from '../../contexts/BudgetContext';
import { sumBudgetByMonth } from '../../utils/calculations';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="card card-bordered p-2 bg-neutral bg-opacity-80">
        <p>{label}</p>
        <p>{`$${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
}

function CategoryLineChart() {
  const { expense, income } = useBudgetState();
  const [data, setData] = useState();
  const [average, setAverage] = useState();

  useEffect(() => {
    setData(sumBudgetByMonth(expense).slice(1, 13).reverse());
  }, [expense, income]);

  useEffect(() => {
    if (data) setAverage(data.reduce((sum, curr) => sum + curr.total, 0) / data.length);
  }, [data]);

  return (
    <div className="w-96 h-60">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          dataKey="total"
          nameKey="label"
          margin={{
            right: 15, left: 15,
          }}
        >
          <XAxis dataKey="label" interval={0} tickFormatter={(tick) => (tick ? tick.slice(0, 3) : '')} />
          <YAxis hide domain={['dataMin * 0.95', 'auto']} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotoneX" dataKey="total" fill="#6419e6" stroke="#6419e6" />
          <ReferenceLine y={average} stroke="#A6ADBA" strokeDasharray="10 3">
            <Label className="font-bold" fill="#A6ADBA" dy={60}>
              {`AVERAGE $${average ? average.toFixed(2) : 0}`}
            </Label>
          </ReferenceLine>
        </AreaChart>
      </ResponsiveContainer>
    </div>

  );
}
export default CategoryLineChart;
