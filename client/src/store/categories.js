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
  addCategory: async (payload) => api.post('/categories', payload)
    .then(({ data }) => set(({ categories, incomeCategories, expenseCategories }) => ({
      categories: [data, ...categories],
      incomeCategories: data.type === 'INCOME' ? [data, ...incomeCategories] : incomeCategories,
      expenseCategories: data.type === 'EXPENSE' ? [data, ...expenseCategories] : expenseCategories,
    })))
    .catch(() => console.log('Failed to create category')),
  updateCategory: async (payload, categoryId) => api.put(`/categories/${categoryId}`, payload)
    .then(({ data }) => set(({ categories }) => {
      const updatedCategories = categories.map((category) => {
        if (category.id === data.id) return data;
        return category;
      });
      return {
        categories: updatedCategories,
        incomeCategories: updatedCategories.filter((cat) => cat.type === 'INCOME'),
        expenseCategories: updatedCategories.filter((cat) => cat.type === 'EXPENSE'),
      };
    }))
    .catch(() => console.log('Failed to update category')),
  deleteCategory: async (categoryId) => api.delete(`/categories/${categoryId}`)
    .then(() => set(({ categories }) => {
      const updatedCategories = categories.filter((category) => (category.id !== categoryId));
      return {
        categories: updatedCategories,
        incomeCategories: updatedCategories.filter((cat) => cat.type === 'INCOME'),
        expenseCategories: updatedCategories.filter((cat) => cat.type === 'EXPENSE'),
      };
    }))
    .catch(() => console.log('Failed to delete category')),
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
