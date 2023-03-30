import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import api from '../services/api';

let fetchCategoriesPromise = null;

const useCategoriesStore = create(subscribeWithSelector((set) => ({
  categories: [],
  incomeCategories: [],
  expenseCategories: [],
  fetchCategories: async () => {
    if (!fetchCategoriesPromise) {
      fetchCategoriesPromise = api.get('/categories')
        .then(({ data }) => set(() => (
          {
            categories: data,
            incomeCategories: data.filter((cat) => cat.type === 'INCOME'),
            expenseCategories: data.filter((cat) => cat.type === 'EXPENSE'),
          }
        )))
        .catch(() => console.log('Failed to fetch categories'));
    }
    return fetchCategoriesPromise;
  },
  resetCategories: () => {
    fetchCategoriesPromise = null;
    set(() => ({
      categories: [],
      incomeCategories: [],
      expenseCategories: [],
    }));
  },
})));

export default useCategoriesStore;
