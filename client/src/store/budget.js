import { create } from 'zustand';
import moment from 'moment';
import api from '../services/api';
import useUserStore from './user';

const useBudgetStore = create((set) => ({
  budget: {},
  expense: {},
  income: {},
  fetchBudget: () => api.get('/transactions')
    .then(({ data }) => set(() => ({
      budget: data,
      expense: data.filter((budgetItem) => budgetItem.type === 'expense'),
      income: data.filter((budgetItem) => budgetItem.type === 'income'),
    })))
    .catch(() => console.log('Failed to fetch budget')),
  addBudgetItem: (payload) => api.post('/transactions', payload)
    .then(({ data }) => set(({ budget }) => {
      const updatedBudget = [data, ...budget]
        .sort((a, b) => moment(a.date).isBefore(b.date));
      return {
        budget: updatedBudget,
        expense: updatedBudget.filter((budgetItem) => budgetItem.type === 'expense'),
        income: updatedBudget.filter((budgetItem) => budgetItem.type === 'income'),
      };
    }))
    .catch(() => console.log('Failed to add budget item')),
  updateBudgetItem: (payload, budgetId) => api.put(`/transactions/${budgetId}`, payload)
    .then(({ data }) => set(({ budget }) => {
      const updatedBudget = budget.map((budgetItem) => {
        if (budgetItem.id === data.id) return data;
        return budgetItem;
      });
      return {
        budget: updatedBudget,
        expense: updatedBudget.filter((budgetItem) => budgetItem.type === 'expense'),
        income: updatedBudget.filter((budgetItem) => budgetItem.type === 'income'),
      };
    }))
    .catch(() => console.log('Failed to update budget item')),
  deleteBudgetItem: (budgetId) => api.delete(`/transactions/${budgetId}`)
    .then(() => set(({ budget }) => {
      const updatedBudget = budget.filter((budgetItem) => (budgetItem.id !== budgetId));
      return {
        budget: updatedBudget,
        expense: updatedBudget.filter((budgetItem) => budgetItem.type === 'expense'),
        income: updatedBudget.filter((budgetItem) => budgetItem.type === 'income'),
      };
    }))
    .catch(() => console.log('Failed to delete budget item'))
  ,
}));

export default useBudgetStore;

useUserStore.subscribe(
  (state) => state.user,
  (user, prevUser) => {
    if (user !== null && prevUser === null) {
      useBudgetStore.fetchBudget();
    }
  },
);
