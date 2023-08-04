import React from 'react';
import useCategoryModalStore from '../../../../store/categoryModal';
import usePageStore from '../../../../store/page';

function EditCategoryHeader({ setSubcategory }) {
  const categoryModal = useCategoryModalStore((s) => s.categoryModal);
  const toggleModal = usePageStore((s) => s.toggleModal);

  return (
    <div className="card-title flex justify-between">
      <div className="flex flex-row gap-2">
        <h3 className="text-lg font-bold">{`Edit ${categoryModal.type === 'EXPENSE' ? 'Expense' : 'Income'} Category`}</h3>
      </div>
      <button type="button" className="btn btn-sm btn-circle" onClick={() => { toggleModal('category'); setSubcategory(''); }}>✕</button>
    </div>
  );
}

export default EditCategoryHeader;
