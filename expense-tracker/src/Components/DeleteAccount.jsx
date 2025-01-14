import React, { useEffect, useRef, useContext }  from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authContext from '../Context/auth/AuthContext';

const DeleteAccount = () => {    

    const navigate = useNavigate();
    const isDeleting = useRef(false);
    const context = useContext(authContext);
    const { authToken } = context;
  
  useEffect(() => {
    const handleDelete = async () => {
      // Only proceed if we arrived here with confirmed: true in state
      if (isDeleting.current) return;
      isDeleting.current = true;
      
      if (!authToken) {
        toast.error('Authentication token not found. Please log in again.');
        navigate('/logout');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/users/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authToken
          }
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
          toast.info(json.message);
          navigate('/logout');
        } else {
          toast.error(json.error);
          navigate('/logout');
        }
      } catch (error) {
        console.error('Delete account error:', error);
        toast.error('An error occurred while deleting the account.');
        navigate('/logout');
      }
    };

    handleDelete();
  }, []); // Run once when component mounts

  // Show loading or return null since this is just a processing component
  return null;
};

export default DeleteAccount;