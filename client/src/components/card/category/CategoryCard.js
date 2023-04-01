import React, { useState, useEffect } from 'react';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Category from './Category';
import useCategoriesStore from '../../../store/categories';
import usePageStore from '../../../store/page';
import useCategoryModalStore from '../../../store/categoryModal';
import CategoryCardFooter from './CategoryCardFooter';

const ITEMS_PER_PAGE = 3;

function CategoryCard({ type = 'EXPENSE' }) {
  const { expenseCategories, incomeCategories } = useCategoriesStore((s) => (
    { expenseCategories: s.expenseCategories, incomeCategories: s.incomeCategories }
  ));
  const toggleModal = usePageStore((s) => s.toggleModal);
  const resetCategoryModal = useCategoryModalStore((s) => s.resetCategoryModal);
  const [pageIndex, setPageIndex] = useState(0);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    setNumPages(
      type === 'EXPENSE'
        ? Math.ceil(expenseCategories.length / ITEMS_PER_PAGE - 1)
        : Math.ceil(incomeCategories.length / ITEMS_PER_PAGE - 1),
    );
  }, [type, expenseCategories, incomeCategories]);

  return (
    <div className="flex flex-grow justify-center">
      <div className="card card-compact bg-neutral w-96 h-80">
        <div className="card-body">
          <div className="card-title text-secondary flex flex-row justify-between">
            {type === 'EXPENSE' ? 'Expense Categories' : 'Income Categories'}
            <button type="button" className="btn btn-primary btn-sm btn-square" onClick={() => { resetCategoryModal(); toggleModal('category'); }}>
              <FontAwesomeIcon icon={faAdd} size="lg" />
            </button>
          </div>
          {
          type === 'EXPENSE'
            ? expenseCategories.map((cat) => <Category key={cat.id} category={cat} />)
              .slice(ITEMS_PER_PAGE * pageIndex, ITEMS_PER_PAGE * (pageIndex + 1))
            : incomeCategories.map((cat) => <Category key={cat.id} category={cat} />)
              .slice(ITEMS_PER_PAGE * pageIndex, ITEMS_PER_PAGE * (pageIndex + 1))
            }
        </div>
        <CategoryCardFooter pageIndex={pageIndex} setPageIndex={setPageIndex} numPages={numPages} />
      </div>
    </div>
  );
}

export default CategoryCard;
