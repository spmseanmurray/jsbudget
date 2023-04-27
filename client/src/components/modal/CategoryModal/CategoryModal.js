import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck, faCircle } from '@fortawesome/free-solid-svg-icons';
import StandardInput from '../../form/StandardInput';
import usePageStore from '../../../store/page';
import useCategoryModalStore from '../../../store/categoryModal';
import EditCategoryHeader from './components/EditCategoryHeader';
import NewCategoryHeader from './components/NewCategoryHeader';

function CategoryModal() {
  const modal = usePageStore((s) => s.modal);
  const {
    categoryModal, setCategory, setColor, setSubcategories,
  } = useCategoryModalStore((s) => ({
    categoryModal: s.categoryModal,
    setCategory: s.setCategory,
    setColor: s.setColor,
    setSubcategories: s.setSubcategories,
  }));
  const [subcategory, setSubcategory] = useState('');
  const [editColor, setEditColor] = useState(false);
  console.log(categoryModal.color);
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
                      <div key={subcat} className="badge badge-xl badge-outline align-center flex flex-row justify-between">
                        <div>
                          {subcat}
                        </div>
                        <button
                          type="button"
                          className="btn w-3.5 h-3.5 min-h-0 p-0 btn-circle btn-outline ml-1 -mr-1"
                          onClick={() => setSubcategories(
                            categoryModal.subcategories.filter((ele) => ele !== subcat),
                          )}
                        >
                          <FontAwesomeIcon size="xs" icon={faXmark} />
                        </button>
                      </div>
                    ))
                }
            </div>
            <div className="label-text">Category Color</div>
            {
              editColor
                ? (
                  <div className="indicator">
                    <div className="indicator-item">
                      <button type="button" className="btn btn-xs btn-circle" onClick={() => setEditColor(false)}>
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                    </div>
                    <HexColorPicker
                      color={categoryModal.color}
                      onChange={(input) => setColor(input)}
                    />
                  </div>
                )
                : (
                  <button type="button" className="btn btn-ghost btn-circle btn-md" onClick={() => setEditColor(true)}>
                    <FontAwesomeIcon
                      icon={faCircle}
                      size="3x"
                      color={categoryModal.color}
                    />
                  </button>
                )
            }
          </div>
        </div>
      </div>
    </>
  );
}
export default CategoryModal;
