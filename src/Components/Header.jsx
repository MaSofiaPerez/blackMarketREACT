import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SignOut from './SignOut';
import { useAuth } from '../Context/AuthContext';
import { FaShoppingCart, FaHeart, FaHome } from 'react-icons/fa';
import { FaRegRectangleList } from 'react-icons/fa6';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const [showSignOut, setShowSignOut] = useState(isAuthenticated);

  useEffect(() => {
    console.log('Estado de autenticación en Header:', isAuthenticated);
    setShowSignOut(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">BlackMarket</h1>
      <nav className='flex items-center'>
        {isAuthenticated && (
          <>
            <Link to="/home" className='mr-4 flex items-center'>
              <FaHome size={20} />
            </Link>
            <Link to="/cart" className='mr-4 flex items-center'>
              <FaShoppingCart size={20} className='mr-1' />
            </Link>
            <Link to="/favorites" className='mr-4 flex items-center'>
              <FaHeart size={20} className='mr-1' />
            </Link>
            <Link to="/orders" className='mr-4 flex items-center'>
              <FaRegRectangleList />
            </Link>
          </>
        )}
        {showSignOut ? (
          <SignOut />
        ) : (
          <div>
            <Link to='/login' className="bg-blue-700 px-4 py-2 mr-2 rounded">Sign In</Link>
            <Link to='/' className="bg-blue-900 px-4 py-2 rounded">Sign Up</Link>
            <Link to="/request-password-reset" className="font-light text-xs px-4 py-2 ">Cambiar contraseña</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
