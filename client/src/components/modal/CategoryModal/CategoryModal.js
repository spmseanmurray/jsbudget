import React, { useState } from 'react';
import StandardInput from '../../form/StandardInput';
import usePageStore from '../../../store/page';
import useCategoryModalStore from '../../../store/categoryModal';
import EditCategoryHeader from './components/EditCategoryHeader';
import NewCategoryHeader from './components/NewCategoryHeader';

function CategoryModal() {
  const modal = usePageStore((s) => s.modal);
  const {
    categoryModal, setCategory,
    // setColor, setSubcategories,
  } = useCategoryModalStore((s) => ({
    categoryModal: s.categoryModal,
    setCategory: s.setCategory,
    setColor: s.setColor,
    setSubcategories: s.setSubcategories,
  }));
  const [subcategory, setSubcategory] = useState('');

  return (
    <>
      <input type="checkbox" id="category-modal" className="modal-toggle" checked={modal.category} readOnly />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative w-96">
          <div className="card-body p-0">
            {categoryModal.id ? <EditCategoryHeader /> : <NewCategoryHeader /> }
            <StandardInput type="text" placeholder="Category Name" value={categoryModal.category} onChange={(input) => setCategory(input.target.value)} />
            <StandardInput type="text" placeholder="Add a subcategory" value={subcategory} onChange={(input) => setSubcategory(input.target.value)} />
            <div className="flex flex-row flex-wrap gap-3">
              {
                    categoryModal?.subcategories?.map((subcat) => (
                      <div key={subcat} className="badge badge-lg badge-outline align-center flex flex-row justify-between">
                        <div>
                          {subcat}
                        </div>
                        <button type="button" className="btn btn-xs btn-circle btn-ghost text-error -mr-2" onClick={() => console.log(subcat)}>✕</button>
                      </div>
                    ))
                }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CategoryModal;
