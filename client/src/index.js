import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

window.addEventListener('load', async () => {
    if (navigator.serviceWorker
        // && !(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
        )
    {
        try {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
            await navigator.serviceWorker.register(swUrl);
            console.log('[SW] register correct');
        } catch (e) {
            console.log('[SW] register fail error:', e);
        }
    }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

