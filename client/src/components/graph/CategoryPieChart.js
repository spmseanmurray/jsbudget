import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Sector, Cell,
} from 'recharts';
import moment from 'moment';
import { ExpenseCategories } from '../../utils/BudgetCategories';
import { useBudgetState } from '../../contexts/BudgetContext';
import { sumBudgetByCategoryAndSort } from '../../utils/calculations';

const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, name, percent, value,
  } = props;

  return (
    <g>
      <text className="font-bold" x={cx} y={cy} textAnchor="middle" fill="#A6ADBA">
        {name}
      </text>
      <text className="font-bold" x={cx} y={cy} dy={16} textAnchor="middle" fill="#A6ADBA">
        {`$${value.toFixed(2)} (${(percent * 100).toFixed(1)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        fillOpacity="110%"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

function CategoryPieChart() {
  const { expense } = useBudgetState();
  const [data, setData] = useState();
  const startDate = moment().startOf('month');
  const endDate = moment().endOf('month');

  useEffect(() => {
    if (expense) {
      setData(sumBudgetByCategoryAndSort(expense, startDate, endDate));
    }
  }, [expense]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => { setActiveIndex(data ? data.length - 1 : 0); }, [data]);

  return (
    <div className="w-80 h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="90%"
            activeShape={renderActiveShape}
            activeIndex={activeIndex}
            onMouseEnter={(_, ind) => setActiveIndex(ind)}
          >
            {
            data && data.map((entry) => (
              <Cell key={entry.category} fill={ExpenseCategories.find((cat) => cat.label === entry.category).color} strokeWidth="0" />
            ))
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>

  );
}
export default CategoryPieChart;
