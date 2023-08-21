import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../Firebase/Firebase-app';
import { getDocs,collection } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const {logIn}=useUserAuth()
  const navigate=useNavigate()
  const userCollection=collection(db,'UserId')
  

  // Load user email from local storage if "Remember me" is checked
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true); // Automatically check the "Remember me" checkbox
    }


    const getUserData=async()=>{
      const data=await getDocs(userCollection)
      const userData=await data.docs.map((doc)=>({
        ...doc.data(),
      }))


      userData.forEach((item)=>{
        if(item.Email===email){
          console.log(email)
        }
      })
      
    }
    getUserData()
    


  }, []);


  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your login logic here
    rememberMe ? localStorage.setItem('userEmail',email):localStorage.removeItem('userEmail')
    try {
      await logIn(email, password);
      console.log('User login successfully');
      navigate("/");
    } catch (err) {
      alert(err.message)
      console.error('Registration error:', err);
      // setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-center w-full">
        <div className="max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full md:w-80 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full md:w-80 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2 h-4 w-4 text-blue-500 focus:ring focus:ring-blue-200"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-200 w-full"
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <span className="text-gray-600">
                New user?{' '}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;