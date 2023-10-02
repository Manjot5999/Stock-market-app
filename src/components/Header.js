import React, { useState } from 'react';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { useDispatch } from 'react-redux';
import { clearCart } from './wishlistSlice';
import Timer from './Timer';

const Header = () => {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    dispatch(clearCart());
    logOut();
    setShowLogoutConfirmation(false);
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <header className='bg-indigo-600 p-4 flex justify-between items-center'>
      <div className='flex items-center space-x-2'>
        <img
          className='h-10 w-10 ml-8 cursor-pointer'
          src='data:image/jpeg;base64,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'
          alt='Logo'
          onClick={() => navigate('/')}
        />
        <h1 className='text-white text-xl font-semibold'>Stock Tracker</h1>
      </div>
      <div className='flex justify-between items-center space-x-4'>
        <div className='relative'>
          <Search />
        </div>
        {user
          ? (
            <button className='text-white hover:text-blue-300 ml-4' onClick={handleLogout}>
              Logout
            </button>
            )
          : (
            <button className='text-white hover:text-blue-300 ml-4' onClick={() => navigate('/login')}>
              Login
            </button>
            )}
        <div className='flex items-center space-x-2 ml-4'>
          <button className='text-white hover:text-blue-300' onClick={() => navigate('/watchlist')}>
            Watchlist
          </button>
        </div>
        <Link to='/news' className='text-white hover:text-blue-300 ml-4'>Financial News</Link>
        <Timer />
      </div>

      {showLogoutConfirmation && (
        <div className='fixed top-0 left-0 right-0 z-50 flex justify-center items-start p-4'>
          <div className='bg-white p-4 rounded-lg w-64'>
            <p className='text-gray-800 mb-2'>Are you sure you want to logout?</p>
            <div className='flex justify-end space-x-2'>
              <button
                className='bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-400'
                onClick={confirmLogout}
              >
                Yes
              </button>
              <button
                className='bg-gray-300 px-3 py-1 rounded hover:bg-gray-400'
                onClick={cancelLogout}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
