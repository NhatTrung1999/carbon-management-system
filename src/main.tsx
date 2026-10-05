import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { BrowserRouter } from 'react-router';
import './i18n';
import { setOnSessionRefreshed } from './lib/axiosConfig';
import { sessionRefreshed } from './features/authSlice';

// Keep Redux in sync when axios silently refreshes the tokens.
setOnSessionRefreshed((next) => store.dispatch(sessionRefreshed(next)));

// After a deploy, an open tab may ask for page chunks that no longer exist.
// Reload once to pick up the new build (at most once per 10s, to avoid loops).
window.addEventListener('vite:preloadError', (event) => {
  const last = Number(sessionStorage.getItem('chunkReloadAt') ?? 0);
  if (Date.now() - last < 10_000) return;
  event.preventDefault();
  sessionStorage.setItem('chunkReloadAt', String(Date.now()));
  window.location.reload();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
