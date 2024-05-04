import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

window.addEventListener('load', async () => {
    console.log('logs load',);
    if (navigator.serviceWorker) {
        try {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
            console.log('logs swUrl', swUrl)
            await navigator.serviceWorker.register(swUrl);
            console.log('service  worker register correct');
        } catch (e) {
            console.log('service  worker register fail e:', e);
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

