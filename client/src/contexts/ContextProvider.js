import React from 'react';
import { ModalProvider } from './ModalContext';
import { BudgetModalProvider } from './BudgetModalContext';

function ContextProvider({ children }) {
  return (
    <ModalProvider>
      <BudgetModalProvider>
        {children}
      </BudgetModalProvider>
    </ModalProvider>
  );
}
export default ContextProvider;
