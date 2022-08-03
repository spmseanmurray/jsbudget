import React from 'react';
import CategoryBreakdownCard from '../components/card/CategoryBreakdownCard';
import MonthlyTotalCard from '../components/card/MonthlyTotalCard';
import RecentTransactionsCard from '../components/card/RecentTransactionsCard';
import YearlyTotalCard from '../components/card/YearlyTotalCard';
import CategoryLineChartCard from '../components/card/CategoryLineChartCard';

function Dashboard() {
  return (
    <div className="flex flex-col scroll-smooth xl:flex-row-reverse xl:justify-around">
      <div className="flex flex-col justify-items-center xl:justify-around mx-4 mt-4 gap-4">
        <MonthlyTotalCard />
        <YearlyTotalCard />
        <RecentTransactionsCard />
      </div>
      <div className="invisible xl:visible xl:py-5 divider divider-horizontal mx-0 px-0" />
      <div className="flex flex-col xl:justify-around m-4 gap-4">
        <CategoryBreakdownCard />
        <CategoryLineChartCard />
      </div>
    </div>

  );
}

export default Dashboard;
