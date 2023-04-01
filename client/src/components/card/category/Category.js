import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import usePageStore from '../../../store/page';
import useCategoryModalStore from '../../../store/categoryModal';

function Category({ category = {} }) {
  const toggleModal = usePageStore((s) => s.toggleModal);
  const setCategoryModal = useCategoryModalStore((s) => s.setCategoryModal);

  return (
    <button
      className="flex flex-row items-center mx-1 p-2 gap-x-3 bg-neutral hover:bg-neutral-focus rounded-3xl"
      onClick={() => {
        setCategoryModal(category);
        toggleModal('category');
      }}
      type="button"
    >
      <FontAwesomeIcon icon={faCircle} size="2xl" color={category.color} />
      <div className="flex flex-col">
        <h2 className="font-bold text-start">{category.category}</h2>
        <div className="flex flex-row flex-wrap gap-1">
          {
            category?.subcategories?.map((subcategory) => (
              <div key={subcategory.id} className="badge badge-outline self-center">
                {subcategory.subcategory}
              </div>
            ))
          }
        </div>
      </div>
    </button>
  );
}

export default Category;
