import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Loads your Tailwind styles
import App from './App'; // Imports your main logic

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);