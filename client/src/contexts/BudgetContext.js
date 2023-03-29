import React, {
  createContext, useContext, useEffect, useMemo, useReducer, useState,
} from 'react';
import moment from 'moment';
import api from '../services/api';
import useUserStore from '../store/user';

const BudgetStateContext = createContext();
const BudgetActionsContext = createContext();

const budgetReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_BUDGET':
      return action.payload;
    case 'ADD_BUDGET':
      return [action.payload, ...state].sort((a, b) => moment(a.date).isBefore(b.date));
    case 'UPDATE_BUDGET':
      return state.map((currBudget) => {
        if (currBudget.id === action.payload.id) return action.payload;
        return currBudget;
      });
    case 'REMOVE_BUDGET':
      return state.filter((currBudget) => currBudget.id !== action.payload);
    default:
      throw new Error();
  }
};

function BudgetProvider({ children }) {
  const [budget, dispatch] = useReducer(budgetReducer, []);
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);
  const user = useUserStore((s) => s.user);

  const initBudget = () => {
    try {
      api.get('/transactions').then(({ data }) => dispatch({ type: 'INIT_BUDGET', payload: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const addBudget = (payload) => {
    try {
      api.post('/transactions', payload).then(({ data }) => dispatch({ type: 'ADD_BUDGET', payload: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const updateBudget = (budgetId, payload) => {
    try {
      api.put(`/transactions/${budgetId}`, payload).then(({ data }) => dispatch({ type: 'UPDATE_BUDGET', payload: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const removeBudget = (budgetId) => {
    try {
      api.delete(`/transactions/${budgetId}`).then(() => dispatch({ type: 'REMOVE_BUDGET', payload: budgetId }));
    } catch (err) {
      console.log(err);
    }
  };

  const budgetActions = useMemo(() => ({ addBudget, updateBudget, removeBudget }), []);

  const budgetData = useMemo(() => ({ budget, expense, income }), [budget, expense, income]);

  useEffect(() => {
    if (user && user.id) {
      initBudget();
    }
  }, [user]);

  useEffect(() => {
    setExpense(budget.filter((budgetItem) => budgetItem.type === 'expense'));
    setIncome(budget.filter((budgetItem) => budgetItem.type === 'income'));
  }, [budget]);

  return (
    <BudgetStateContext.Provider value={budgetData}>
      <BudgetActionsContext.Provider value={budgetActions}>
        {children}
      </BudgetActionsContext.Provider>
    </BudgetStateContext.Provider>
  );
}

function useBudgetState() {
  const budget = useContext(BudgetStateContext);

  if (budget === null) {
    throw new Error('Cannot use budget state unless component is a decendant of the BudgetProvider');
  }

  return budget;
}

function useBudgetActions() {
  const dispatch = useContext(BudgetActionsContext);

  if (dispatch === null) {
    throw new Error('Cannot use budget actions unless component is a decendant of the BudgetProvider');
  }

  return dispatch;
}

const useBudget = () => [useBudgetState(), useBudgetActions()];

export {
  BudgetProvider, useBudgetState, useBudgetActions, useBudget,
};
