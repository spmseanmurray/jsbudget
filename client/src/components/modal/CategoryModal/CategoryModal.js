import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faDroplet, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import StandardInput from '../../form/StandardInput';
import StandardSubmittableInput from '../../form/StandardSubmittableInput';
import usePageStore from '../../../store/page';
import useCategoryModalStore from '../../../store/categoryModal';
import EditCategoryHeader from './components/EditCategoryHeader';
import NewCategoryHeader from './components/NewCategoryHeader';
import EditCategoryFooter from './components/EditCategoryFooter';
import NewCategoryFooter from './components/NewCategoryFooter';

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

  return (
    <>
      <input type="checkbox" id="category-modal" className="modal-toggle" checked={modal.category} readOnly />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative w-96">
          <div className="card-body p-0">
            {
            categoryModal.id
              ? <EditCategoryHeader setSubcategory={setSubcategory} />
              : <NewCategoryHeader setSubcategory={setSubcategory} />
            }
            <div className="flex flex-row gap-5">
              <div className="flex flex-col w-3/5 gap-2">
                <StandardInput type="text" placeholder="Category Name" value={categoryModal.category} onChange={(input) => setCategory(input.target.value)} />
                <StandardSubmittableInput
                  type="text"
                  placeholder="Add a subcategory"
                  value={subcategory}
                  icon={faArrowRight}
                  onChange={(input) => setSubcategory(input.target.value)}
                  onClick={() => { setSubcategories([...categoryModal.subcategories, subcategory]); setSubcategory(''); }}
                />
              </div>
              <div className="w-2/5">
                <div className="flex flex-row justify-between items-center label-text mb-2">
                  Category Color
                  <FontAwesomeIcon icon={faDroplet} size="xl" color={categoryModal.color} />
                </div>
                <HexColorPicker
                  style={{ width: '175px', height: '130px' }}
                  color={categoryModal.color}
                  onChange={(input) => setColor(input)}
                />
              </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3 mt-3">
              {
                categoryModal?.subcategories?.map((subcat) => (
                  <div key={subcat} className="badge badge-xl badge-outline flex flex-row justify-between">
                    <div>
                      {subcat}
                    </div>
                    <button
                      type="button"
                      className="btn w-3.5 h-3.5 min-h-0 p-0 btn-circle btn-outline ml-1 -mr-1"
                      onClick={() => setSubcategories(categoryModal.subcategories
                        .toSpliced(categoryModal.subcategories.indexOf(subcat), 1))}
                    >
                      <FontAwesomeIcon size="xs" icon={faXmark} />
                    </button>
                  </div>
                ))
              }
            </div>
            {
            categoryModal.id
              ? <EditCategoryFooter />
              : <NewCategoryFooter />
            }
          </div>
        </div>
      </div>
    </>
  );
}
export default CategoryModal;
