import React from 'react';
import { UserProvider } from './UserContext';
import { BudgetProvider } from './BudgetContext';
import { ModalProvider } from './ModalContext';
import { BudgetModalProvider } from './BudgetModalContext';

function ContextProvider({ children }) {
  return (
    <UserProvider>
      <BudgetProvider>
        <ModalProvider>
          <BudgetModalProvider>
            {children}
          </BudgetModalProvider>
        </ModalProvider>
      </BudgetProvider>
    </UserProvider>
  );
}
export default ContextProvider;
