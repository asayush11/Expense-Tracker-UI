import React, { useEffect, useRef }  from 'react'
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {    

    const navigate = useNavigate();
    const isDeleting = useRef(false);
  
  useEffect(() => {
    const handleDelete = async () => {
      // Only proceed if we arrived here with confirmed: true in state
      if (isDeleting.current) return;
      isDeleting.current = true;

      const token = localStorage.getItem('token');
      if (!token) {
        alert('Authentication token not found. Please log in again.');
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/users/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          }
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
          alert(json.message);
          // Clear storage only after successful deletion
          localStorage.removeItem('token');
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('email');
          navigate('/');
        } else {
          alert(json.error);
          navigate('/');
        }
      } catch (error) {
        console.error('Delete account error:', error);
        alert('An error occurred while deleting the account.');
        navigate('/e');
      }
    };

    handleDelete();
  }, []); // Run once when component mounts

  // Show loading or return null since this is just a processing component
  return null;
};

export default DeleteAccount;