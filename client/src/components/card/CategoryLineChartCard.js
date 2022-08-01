import React from 'react';
import CategoryLineChart from '../graph/CategoryLineChart';

function CategoryLineChartCard() {
  return (
    <div className="card card-compact bg-neutral w-96 h-fit">
      <div className="card-body">
        <div className="card-title text-secondary">Monthly Breakdown</div>
        <div className="flex flex-grow justify-center">
          <CategoryLineChart />
        </div>
      </div>
    </div>
  );
}

export default CategoryLineChartCard;
