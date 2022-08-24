import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from '../src/utils/context/index';

import Header from './components/Header';
import Footer from './components/Footer';
import Error from './components/Error';

import Compte from './pages/Compte/index';
import Accueil from './pages/Accueil';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Compte />} />
          <Route path="Accueil" element={<Accueil />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
