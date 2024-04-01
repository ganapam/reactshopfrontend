import React from 'react';
import { useNavigate } from 'react-router-dom';
const Adminlogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Adminlogout;
