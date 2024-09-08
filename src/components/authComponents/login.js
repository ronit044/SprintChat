"use client";
import React, { useState } from 'react';
import { FaUser, FaLock, FaGoogle, FaEnvelope } from 'react-icons/fa';
import { createUser, loginUser } from '@/utils/firbaseUtils';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProtectedRoute from '@/components/authComponents/ProtectRedundantLogin';
import { useAuth } from '@/components/authComponents/authProvider';
import Loader from '@/components/loader';
const LoginSignup = () => {
  const { isLoggedIn, loading } = useAuth;
  const mode = useSelector((state) => state.theme.mode);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // For signup only
  const [error, setError] = useState('');
  const handleAuth = async () => {
    try {
      if (isLogin) {
        const response = await loginUser(email, password);
        if (response.success) {
          toast.success('Login successful!');
        } else {
          toast.error(response.error);
        }
      } else {
        const response = await createUser(email, password, username);
        if (response.success) {
          toast.success('Signup successful!');
        } else {
          toast.error(response.error);
        }
      }
    } catch (err) {
      setError(err.message);
      toast.error('An error occurred.');
    }
  };
  if(loading){
    return <Loader></Loader>
  }

  return (
    <ProtectedRoute>
    <div className={`min-h-screen flex items-center justify-center ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`p-6 rounded-lg shadow-lg border ${mode === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg transition duration-300`}>
        <h2 className={`text-center text-2xl font-bold mb-4 ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <div className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Username input for signup only */}
          {!isLogin && (
            <div className="flex items-center border-b pb-2">
              <FaUser className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full p-2 bg-transparent outline-none ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}
              />
            </div>
          )}

          <div className="flex items-center border-b pb-2">
            <FaEnvelope className="mr-2 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 bg-transparent outline-none ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}
            />
          </div>
          <div className="flex items-center border-b pb-2">
            <FaLock className="mr-2 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 bg-transparent outline-none ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}
            />
          </div>
          <button
            onClick={handleAuth}
            className="w-full p-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          {/* Toggle between login/signup */}
          <p className={`text-center mt-4 cursor-pointer hover:underline ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </p>
        </div>
      </div>

    </div>
    </ProtectedRoute>
  );
};

export default LoginSignup;
