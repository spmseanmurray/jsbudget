import React from 'react';

function TotalStat({
  title, total, type,
}) {
  return (
    <div className="stat w-40">
      <div className="stat-title">{title}</div>
      <div className={`stat-value text-2xl ${type === 'expense' ? 'text-error' : 'text-success'}`}>
        {`$${total.toFixed(2)}`}
      </div>
    </div>
  );
}

export default TotalStat;
