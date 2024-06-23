import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/auth';

console.log('Starting the routing process...');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
       <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>

  </AuthProvider>

);
 

console.log('Routing process completed.');

reportWebVitals();
