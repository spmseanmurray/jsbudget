import React from 'react';
import CategoryBreakdownCard from '../components/card/CategoryBreakdownCard';
import MonthlyTotalCard from '../components/card/MonthlyTotalCard';
import RecentTransactionsCard from '../components/card/RecentTransactionsCard';
import YearlyTotalCard from '../components/card/YearlyTotalCard';
import CategoryLineChartCard from '../components/card/CategoryLineChartCard';

function Dashboard() {
  return (
    <div className="flex flex-grow justify-between">
      <div className="flex flex-col justify-around mx-4">
        <CategoryBreakdownCard />
        <CategoryLineChartCard />
      </div>
      <div className="flex flex-col justify-around mx-4">
        <MonthlyTotalCard />
        <YearlyTotalCard />
        <RecentTransactionsCard />
      </div>
    </div>

  );
}

export default Dashboard;
