import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';

function TotalStat({
  title, total, type, relativeTotal,
}) {
  return (
    <div className="stat w-40">
      <div className="stat-title">{title}</div>
      <div className={`stat-value text-2xl ${type === 'expense' ? 'text-error' : 'text-success'}`}>
        {`$${total.toFixed(2)}`}
      </div>
      {relativeTotal ? (
        <div className="stat-desc text-white">
          { relativeTotal > 0
            ? <FontAwesomeIcon className={type === 'expense' ? 'text-error' : 'text-success'} icon={faArrowTrendUp} />
            : <FontAwesomeIcon className={type === 'expense' ? 'text-success' : 'text-error'} icon={faArrowTrendDown} />}
          {` $${Math.abs(relativeTotal).toFixed(2)}`}
        </div>
      ) : null}
    </div>
  );
}

export default TotalStat;
