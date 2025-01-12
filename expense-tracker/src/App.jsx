import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import ExpenseState from './Context/expenses/ExpenseState';
import { Alert } from './Components/Alert';
import { Home } from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/SignUP';
import UserHome from './Components/UserHome';
import DeleteAccount from './Components/DeleteAccount';
import Expenses from './Components/Expenses';
import Loans from './Components/Loans';
import ChangePassword from './Components/ChangePassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LogOut } from 'lucide-react';
import { Logout } from './Components/Logout';

function App() {
  localStorage.setItem('token',"");
  localStorage.setItem('isLoggedIn',false);
  localStorage.removeItem('email');
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    <ExpenseState>      
      <Router>
        <Navbar />
        <Alert message="Welcome to my Expense Tracker App" />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/deleteAccount" element={<DeleteAccount />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/userHome" element={<UserHome />} />
          </Routes>
        </div>
      </Router>
    </ExpenseState>  
    </>
  );
}

export default App;

