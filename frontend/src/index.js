import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './dashboard/LandingPage';
import RegisterPage from './dashboard/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import LoginPage from './dashboard/LoginPage';
import UserList from './dashboard/UserList';
import EditData from './dashboard/EditData';
import Whatsapp from './dashboard/Whatsapp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/userlist' element={<UserList />} />
        <Route path='/editdata/:id' element={<EditData />} />
        <Route path='/whatsapp' element={<Whatsapp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
