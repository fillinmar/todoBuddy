import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const isLocalHost = () => {
    return     window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
}

window.addEventListener('load', async () => {
    if (!isLocalHost && navigator.serviceWorker)
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

