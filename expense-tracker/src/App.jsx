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
import ExpenseState from './Contexts/ExpenseState';
import { Alert } from './Components/Alert';
import { Home } from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/SignUP';

function App() {
  return (
    <ExpenseState>
      <Router>
        <Navbar />
        <Alert message="Welcome to my Expense Tracker App" />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </ExpenseState>
  /*  <>
      <ExpenseState>
        <Router>
          <Navbar />
          <Alert message="Welcome to my Expense Tracker App" />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}>
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </Routes>
          </div>
        </Router>
      </ExpenseState>
    </>*/
  );
}

export default App;

