import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      // Clear all localStorage items
      localStorage.setItem('token', "");

      // Use navigate inside useEffect
      navigate('/', { replace: true });
    };

    handleLogout();
  }, []); // Empty dependency array means this runs once when component mounts

  // Return null instead of calling navigate directly
  return null;
};

export default Logout;