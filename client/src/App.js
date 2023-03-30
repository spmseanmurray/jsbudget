import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BudgetModalProvider } from './contexts/BudgetModalContext';
import Routes from './routes/routes';

function App() {
  document.title = 'JS Budgeting';

  return (
    <div className="flex w-screen h-screen justify-center scrollbar-hide">
      <BudgetModalProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </BudgetModalProvider>
    </div>
  );
}

export default App;
