import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';

function StandardTableFooter({
  numColumns, pageIndex, setPageIndex, numPages,
}) {
  return (
    <tr key="BudgetFooter">
      <td colSpan={numColumns} className="bg-neutral">
        <div className="flex flex-grow flex-row justify-between">
          <div className="space-x-2">
            <button type="submit" className="btn btn-primary btn-xs" onClick={(() => setPageIndex(0))} disabled={pageIndex <= 1}>
              <FontAwesomeIcon icon={faAnglesLeft} size="xl" />
            </button>
            <button type="submit" className="btn btn-primary btn-xs" onClick={(() => setPageIndex(pageIndex - 1))} disabled={pageIndex === 0}>
              <FontAwesomeIcon icon={faAngleLeft} size="xl" />
            </button>
          </div>
          <div>{`${pageIndex + 1}/${numPages + 1}`}</div>
          <div className="space-x-2">
            <button type="submit" className="btn btn-primary btn-xs" onClick={(() => setPageIndex(pageIndex + 1))} disabled={pageIndex >= numPages}>
              <FontAwesomeIcon icon={faAngleRight} size="xl" />
            </button>
            <button type="submit" className="btn btn-primary btn-xs" onClick={(() => setPageIndex(numPages))} disabled={pageIndex >= numPages - 1}>
              <FontAwesomeIcon icon={faAnglesRight} size="xl" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default StandardTableFooter;
