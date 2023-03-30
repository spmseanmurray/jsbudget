import { create } from 'zustand';
import useCategoriesStore from './categories';

const initialBudgetModal = {
  id: null,
  type: 'EXPENSE',
  description: '',
  amount: '',
  date: new Date(),
  category: '',
  subcategory: '',
};

const useBudgetModalStore = create((set, get) => ({
  budgetModal: initialBudgetModal,
  categoryOptions: useCategoriesStore.getState().expenseCategories,
  subcategoryOptions: [],
  setBudgetModal: (budgetItem) => set(() => {
    const selectedCategory = get().categoryOptions
      .find((cat) => cat.id === budgetItem.category.id) || {};
    return {
      budgetModal: {
        id: budgetItem.id,
        type: budgetItem.type,
        description: budgetItem.description,
        amount: budgetItem.amount,
        date: new Date(budgetItem.date),
        category: budgetItem.category.category,
        subcategory: budgetItem.subcategory.subcategory || '',
      },
      subcategoryOptions: Object.hasOwn(selectedCategory, 'subcategories') ? selectedCategory.subcategories : [],
    };
  }),
  resetBudgetModal: () => set(() => ({
    budgetModal: initialBudgetModal,
    subcategoryOptions: [],
  })),
  setId: (id) => set(({ budgetModal }) => ({ budgetModal: { ...budgetModal, id } })),
  setType: (type) => set(({ budgetModal }) => (
    {
      budgetModal: { ...budgetModal, type },
      categoryOptions: type === 'EXPENSE' ? useCategoriesStore.getState().expenseCategories : useCategoriesStore.getState().incomeCategories,
    }
  )),
  setDesciption: (description) => set(({ budgetModal }) => (
    { budgetModal: { ...budgetModal, description } }
  )),
  setAmount: (amount) => set(({ budgetModal }) => ({ budgetModal: { ...budgetModal, amount } })),
  setDate: (date) => set(({ budgetModal }) => ({ budgetModal: { ...budgetModal, date } })),
  setCategory: (categoryName) => set(({ budgetModal }) => {
    const selectedCategory = get().categoryOptions
      .find((cat) => cat.category === categoryName) || {};
    return {
      budgetModal: { ...budgetModal, categoryName },
      subcategoryOptions: Object.hasOwn(selectedCategory, 'subcategories') ? selectedCategory.subcategories : [],
    };
  }),
  setSubcategory: (subcategory) => set(({ budgetModal }) => (
    { budgetModal: { ...budgetModal, subcategory } }
  )),
  setCategoryOptions: (categories) => set(() => ({ categoryOptions: categories })),
}));

useCategoriesStore.subscribe(
  (state) => [state.expenseCategories, state.incomeCategories],
  ([expenseCategories, incomeCategories]) => (
    useBudgetModalStore.getState().budgetModal.type === 'EXPENSE'
      ? useBudgetModalStore.getState().setCategoryOptions(expenseCategories)
      : useBudgetModalStore.getState().setCategoryOptions(incomeCategories)
  ),

);

export default useBudgetModalStore;
