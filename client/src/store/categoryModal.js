import { create } from 'zustand';

const initialCategoryModal = {
  id: null,
  type: 'EXPENSE',
  category: '',
  color: '#ffffff',
  subcategories: [],
};

const useCategoryModalStore = create((set) => ({
  categoryModal: initialCategoryModal,
  setCategoryModal: (category) => set(() => ({
    categoryModal: {
      id: category.id,
      type: category.type,
      category: category.category,
      color: category.color,
      subcategories: category.subcategories,
    },
  })),
  resetCategoryModal: (type = 'EXPENSE') => set(() => ({
    categoryModal: { ...initialCategoryModal, type },
  })),
  setCategory: (category) => set(({ categoryModal }) => (
    { categoryModal: { ...categoryModal, category } }
  )),
  setColor: (color) => set(({ categoryModal }) => (
    { categoryModal: { ...categoryModal, color } }
  )),
  setSubcategories: (subcategories) => set(({ categoryModal }) => (
    { categoryModal: { ...categoryModal, subcategories } }
  )),
}));

export default useCategoryModalStore;
