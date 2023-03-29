import React, {
  createContext, useContext, useState, useMemo, useEffect,
} from 'react';
import useCategoriesStore from '../store/categories';

const BudgetModalState = createContext();
const BudgetModalActions = createContext();

function BudgetModalProvider({ children }) {
  const { incomeCategories, expenseCategories } = useCategoriesStore((s) => (
    { incomeCategories: s.incomeCategories, expenseCategories: s.expenseCategories }
  ));
  const [id, setId] = useState();
  const [type, setType] = useState('EXPENSE');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (type === 'INCOME') setCategories(incomeCategories);
    if (type === 'EXPENSE') setCategories(expenseCategories);
    if (!id) setCategory('');
  }, [type, incomeCategories, expenseCategories]);

  useEffect(() => {
    const selectedCategory = categories.find((cat) => cat.category === category) || {};
    setSubcategories(
      Object.hasOwn(selectedCategory, 'subcategories') ? selectedCategory.subcategories : [],
    );
    if (!id) setSubcategory('');
  }, [category, categories]);

  const resetBudgetModal = () => {
    setId();
    setType('EXPENSE');
    setDescription('');
    setAmount('');
    setDate(new Date());
    setCategory('');
    setSubcategory('');
  };

  const setBudgetModal = (budgetItem) => {
    setId(budgetItem.id);
    setType(budgetItem.type);
    setDescription(budgetItem.description);
    setAmount(budgetItem.amount);
    setDate(new Date(budgetItem.date));
    setCategory(budgetItem.category.category);
    setSubcategory(budgetItem.subcategory?.subcategory || '');
  };

  const budgetModal = useMemo(() => ({
    id, type, description, amount, date, category, subcategory, categories, subcategories,
  }), [id, type, description, amount, date, category, subcategory, categories, subcategories]);

  const budgetModalActions = useMemo(() => ({
    setType,
    setDescription,
    setAmount,
    setDate,
    setCategory,
    setSubcategory,
    resetBudgetModal,
    setBudgetModal,
  }), []);

  return (
    <BudgetModalState.Provider value={budgetModal}>
      <BudgetModalActions.Provider value={budgetModalActions}>
        {children}
      </BudgetModalActions.Provider>
    </BudgetModalState.Provider>
  );
}

function useBudgetModalState() {
  const budget = useContext(BudgetModalState);

  if (budget === null) {
    throw new Error('Cannot use budget modal state unless component is a decendant of the BudgetModalProvider');
  }

  return budget;
}

function useBudgetModalActions() {
  const actions = useContext(BudgetModalActions);

  if (actions === null) {
    throw new Error('Cannot use budget modal actions unless component is a decendant of the BudgetModalProvider');
  }

  return actions;
}

const useBudgetModal = () => [useBudgetModalState(), useBudgetModalActions()];

export {
  BudgetModalProvider, useBudgetModal, useBudgetModalActions, useBudgetModalState,
};
