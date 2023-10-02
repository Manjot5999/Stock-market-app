import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { useDispatch } from 'react-redux';
import { addItemAsync } from './wishlistSlice';
import { ClipLoader } from 'react-spinners';
import formValidate from '../utils/formValidate';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useUserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const flag = formValidate(email, password);
    if (flag[0] === false) {
      setErrorMessage(flag[1]);
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password);
      dispatch(addItemAsync({
        Email: email,
        Wishlist: []
      }));
      navigate('/login');
    } catch (err) {
      alert(err);
      console.error('Registration error:', err);
    }

    setLoading(false);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='flex items-center justify-center w-full'>
        <div className='max-w-md bg-white p-8 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>Register</h2>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <input
                type='text'
                id='fullName'
                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300'
                placeholder='Enter your full name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <input
                type='email'
                id='email'
                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type='password'
                id='password'
                className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              {errorMessage !== '' && <p className='text-red-500'>{errorMessage}</p>}
              <button
                type='submit'
                className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-200 w-full'
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader size={18} color='white' /> : 'Register'}
              </button>
            </div>
            <div className='text-center'>
              <span className='text-gray-600'>
                Already have an account?{' '}
                <Link to='/login' className='text-blue-500 hover:underline'>
                  Login here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
