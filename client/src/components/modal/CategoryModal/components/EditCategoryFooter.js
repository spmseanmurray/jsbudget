import React from 'react';
import useCategoryModalStore from '../../../../store/categoryModal';
import useCategoriesStore from '../../../../store/categories';
import usePageStore from '../../../../store/page';

function EditCategoryFooter() {
  const { updateCategory, deleteCategory } = useCategoriesStore((s) => (
    { updateCategory: s.updateCategory, deleteCategory: s.deleteCategory }
  ));
  const toggleModal = usePageStore((s) => s.toggleModal);
  const { categoryModal, resetCategoryModal } = useCategoryModalStore((s) => (
    { categoryModal: s.categoryModal, resetCategoryModal: s.resetCategoryModal }
  ));

  const handleUpdate = () => {
    updateCategory(categoryModal, categoryModal.id);
    resetCategoryModal();
    toggleModal('category');
  };

  const handleDelete = () => {
    deleteCategory(categoryModal.id);
    resetCategoryModal();
    toggleModal('category');
  };
  return (
    <div className="modal-action">
      <div className="flex flex-grow flex-row justify-between">
        <button type="submit" className="btn btn-primary w-1/4" onClick={() => handleDelete()}>Delete</button>
        <button type="submit" className="btn btn-primary w-1/4" onClick={() => handleUpdate()}>Update</button>
      </div>
    </div>
  );
}

export default EditCategoryFooter;
