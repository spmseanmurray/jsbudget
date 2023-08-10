import React from 'react';
import useCategoryModalStore from '../../../../store/categoryModal';
import useCategoriesStore from '../../../../store/categories';

function NewCategoryFooter() {
  const addCategory = useCategoriesStore((s) => s.addCategory);
  const { categoryModal, resetCategoryModal } = useCategoryModalStore((s) => (
    { categoryModal: s.categoryModal, resetCategoryModal: s.resetCategoryModal }
  ));

  const handleSubmit = () => {
    addCategory(categoryModal);
    resetCategoryModal();
  };

  return (
    <div className="modal-action">
      <button type="submit" className="btn btn-primary btn-block" onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}

export default NewCategoryFooter;
