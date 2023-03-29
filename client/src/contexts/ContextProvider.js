import React from 'react';
import { BudgetProvider } from './BudgetContext';
import { ModalProvider } from './ModalContext';
import { BudgetModalProvider } from './BudgetModalContext';

function ContextProvider({ children }) {
  return (
    <BudgetProvider>
      <ModalProvider>
        <BudgetModalProvider>
          {children}
        </BudgetModalProvider>
      </ModalProvider>
    </BudgetProvider>
  );
}
export default ContextProvider;
