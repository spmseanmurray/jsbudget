import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/routes';

function App() {
  document.title = 'JS Budgeting';

  return (
    <div className="flex w-screen h-screen justify-center scrollbar-hide">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
