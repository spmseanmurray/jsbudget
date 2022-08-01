import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ContextProvider from './contexts/ContextProvider';
import Routes from './routes/routes';

function App() {
  document.title = 'JS Budgeting';

  return (
    <div className="flex w-screen h-screen justify-center">
      <ContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
