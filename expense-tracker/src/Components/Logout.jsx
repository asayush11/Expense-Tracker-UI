import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from 'react';
import expenseContext from "../context/expenses/expenseContext"

export const Logout = () => {
  const navigate = useNavigate();
  const context = useContext(expenseContext);
  const { refreshExpenses } = context; 

  useEffect(() => {
    const handleLogout = () => {
      // Clear all localStorage items
      localStorage.setItem('token', "");
      refreshExpenses([]);  
      // Use navigate inside useEffect
      navigate('/', { replace: true });
    };

    handleLogout();
  }, []); // Empty dependency array means this runs once when component mounts

  // Return null instead of calling navigate directly
  return null;
};

export default Logout;