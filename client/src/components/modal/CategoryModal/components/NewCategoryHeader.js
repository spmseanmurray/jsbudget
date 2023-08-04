import React from 'react';
import usePageStore from '../../../../store/page';

function NewCategoryHeader({ setSubcategory }) {
  const toggleModal = usePageStore((s) => s.toggleModal);

  return (
    <div className="card-title">
      <div className="flex flex-grow flex-col gap-2">
        <div className="flex flex-row flex-grow justify-between">
          <h3 className="text-lg font-bold">Add a New Category</h3>
          <button type="button" className="btn btn-sm btn-circle" onClick={() => { toggleModal('category'); setSubcategory(''); }}>✕</button>
        </div>
      </div>
    </div>
  );
}

export default NewCategoryHeader;
