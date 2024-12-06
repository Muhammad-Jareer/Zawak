import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true, // Opt in for startTransition feature in v7
          v7_relativeSplatPath: true, // Opt in for relative splat path feature in v7
        }}
      >
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
