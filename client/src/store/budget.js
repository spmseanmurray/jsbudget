import { create } from 'zustand';
import moment from 'moment';
import api from '../services/api';

let fetchBudgetPromise = null;

const useBudgetStore = create((set) => ({
  budget: [],
  expense: [],
  income: [],
  fetchBudget: async () => {
    if (!fetchBudgetPromise) {
      fetchBudgetPromise = api.get('/transactions')
        .then(({ data }) => set(() => ({
          budget: data,
          expense: data.filter((budgetItem) => budgetItem.type === 'EXPENSE'),
          income: data.filter((budgetItem) => budgetItem.type === 'INCOME'),
        })))
        .catch(() => console.log('Failed to fetch budget'));
    }
    return fetchBudgetPromise;
  },
  addBudgetItem: async (payload) => api.post('/transactions', payload)
    .then(({ data }) => set(({ budget }) => {
      const updatedBudget = [data, ...budget]
        .sort((a, b) => moment(a.date).isBefore(b.date));
      return {
        budget: updatedBudget,
        expense: updatedBudget.filter((budgetItem) => budgetItem.type === 'EXPENSE'),
        income: updatedBudget.filter((budgetItem) => budgetItem.type === 'INCOME'),
      };
    }))
    .catch(() => console.log('Failed to add budget item')),
  updateBudgetItem: async (payload, budgetId) => api.put(`/transactions/${budgetId}`, payload)
    .then(({ data }) => set(({ budget }) => {
      const updatedBudget = budget.map((budgetItem) => {
        if (budgetItem.id === data.id) return data;
        return budgetItem;
      });
      return {
        budget: updatedBudget,
        expense: updatedBudget.filter((budgetItem) => budgetItem.type === 'EXPENSE'),
        income: updatedBudget.filter((budgetItem) => budgetItem.type === 'INCOME'),
      };
    }))
    .catch(() => console.log('Failed to update budget item')),
  deleteBudgetItem: async (budgetId) => api.delete(`/transactions/${budgetId}`)
    .then(() => set(({ budget }) => {
      const updatedBudget = budget.filter((budgetItem) => (budgetItem.id !== budgetId));
      return {
        budget: updatedBudget,
        expense: updatedBudget.filter((budgetItem) => budgetItem.type === 'EXPENSE'),
        income: updatedBudget.filter((budgetItem) => budgetItem.type === 'INCOME'),
      };
    }))
    .catch(() => console.log('Failed to delete budget item')),
  resetBudget: () => {
    fetchBudgetPromise = null;
    set(() => ({
      budget: [],
      expense: [],
      income: [],
    }));
  },
}));

export default useBudgetStore;
