import React, { useState } from 'react';
import CategoryLineChart from '../graph/CategoryLineChart';
import useCategoriesStore from '../../store/categories';

function CategoryLineChartCard() {
  const expenseCategories = useCategoriesStore((s) => s.expenseCategories);
  const [category, setCategory] = useState('Total Expenses');
  const options = ['Total Expenses', 'Total Income', ...expenseCategories.map((cat) => cat.category)];

  return (
    <div className="flex flex-grow justify-center">
      <div className="card card-compact bg-neutral w-96 h-min">
        <div className="card-body">
          <div className="card-title text-secondary flex justify-between">
            <div>Monthly Breakdown</div>
            <div className="flex flex-shrink">
              <select
                className="select select-sm select-bordered w-full text-neutral-content"
                id="category"
                required
                disabled={options.length < 1}
                value={category}
                onChange={(input) => setCategory(input.target.value)}
              >
                {options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
          </div>
          <div className="flex flex-grow justify-center">
            <CategoryLineChart category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryLineChartCard;
