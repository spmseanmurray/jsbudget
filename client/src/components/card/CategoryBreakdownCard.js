import React from 'react';
import CategoryPieChart from '../graph/CategoryPieChart';

function CategoryBreakdownCard() {
  return (
    <div className="flex flex-grow justify-center">
      <div className="card card-compact bg-neutral w-96 h-min">
        <div className="card-body">
          <div className="card-title text-secondary">Category Breakdown</div>
          <div className="flex flex-grow justify-center">
            <CategoryPieChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryBreakdownCard;
