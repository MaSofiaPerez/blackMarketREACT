import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const SignOut = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const uid = localStorage.getItem('uid');
      const client = localStorage.getItem('client');

      const response = await fetch('https://rs-blackmarket-api.herokuapp.com/api/v1/users/sign_out', {
        method: 'DELETE',
        headers: {
          'access-token': token,
          'uid': uid,
          'client': client,
          'Content-type': 'application/json'
        }
      });

      if (response.ok) {
        localStorage.removeItem('access-token');
        localStorage.removeItem('uid');
        localStorage.removeItem('client');
        setIsAuthenticated(false);
        navigate('/login');
      } else {
        console.error('Error al cerrar sesión:', await response.json());
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-700 font-medium px-3 py-2 rounded"
    >
      Sign Out
    </button>
  );
};

export default SignOut;
