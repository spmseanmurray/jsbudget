import React from 'react';
import {
  faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CategoryCardFooter({ pageIndex, numPages, setPageIndex }) {
  return (
    <div className="flex flex-row w-full justify-between place-self-end">
      <div className="space-x-2 ml-2">
        <button type="submit" className="btn btn-primary btn-xs" onClick={(() => setPageIndex(0))} disabled={pageIndex <= 1}>
          <FontAwesomeIcon icon={faAnglesLeft} size="xl" />
        </button>
        <button type="submit" className="btn btn-primary btn-xs" onClick={(() => setPageIndex(pageIndex - 1))} disabled={pageIndex === 0}>
          <FontAwesomeIcon icon={faAngleLeft} size="xl" />
        </button>
      </div>
      <div>{`${pageIndex + 1}/${numPages + 1}`}</div>
      <div className="space-x-2 mr-2">
        <button type="submit" className="btn btn-primary btn-xs" onClick={(() => setPageIndex(pageIndex + 1))} disabled={pageIndex >= numPages}>
          <FontAwesomeIcon icon={faAngleRight} size="xl" />
        </button>
        <button type="submit" className="btn btn-primary btn-xs" onClick={(() => setPageIndex(numPages))} disabled={pageIndex >= numPages - 1}>
          <FontAwesomeIcon icon={faAnglesRight} size="xl" />
        </button>
      </div>
    </div>
  );
}

export default CategoryCardFooter;
