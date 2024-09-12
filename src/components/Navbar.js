"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/redux/themeSlice';
import { FaSun, FaMoon, FaUser, FaSignInAlt, FaUserPlus, FaBars } from 'react-icons/fa';
import { logoutUser } from '@/utils/firbaseUtils';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/authComponents/authProvider';
import Loader from '@/components/loader';

const AutoTyper = ({ mode }) => {
  const text = "TaskFlow";
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText(prev => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setIndex(0); // Reset index to start typing again
        }
      } else {
        if (displayedText.length < text.length) {
          setDisplayedText(prev => prev + text.charAt(index));
          setIndex(index + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
        }
      }
    };
    const typingSpeed = isDeleting ? 50 : 100;
    const typingInterval = setInterval(handleTyping, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [displayedText, isDeleting, index]);

  return (
    <h1
      className={`text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold ${mode === 'dark' ? 'text-yellow-500' : 'text-black'} ${isDeleting ? 'italic' : ''}`}
      style={{
        textShadow: mode === 'dark' ? '2px 2px 8px rgba(0, 0, 0, 0.6)' : '2px 2px 8px rgba(255, 255, 0, 0.6)', // Black shadow for dark, yellow shadow for light
        border: `2px solid ${mode === 'dark' ? 'yellow' : '#FFD700'}`, // More intense yellow in light mode
        borderRadius: '8px',
        padding: '0 8px',
        display: 'inline-block',
      }}
    >
      {displayedText}
    </h1>
  );
};


const Navbar = () => {
  const { loading } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const mode = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.auth.user);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu on smaller screens

  const LoginRedirect = () => {
    router.push("/auth");
  };

  const Logout = () => {
    const response = logoutUser();
    if (response.success) {
      toast.success('Successfully Logged Out!');
    } else {
      toast.error(response.error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={`p-2 xl:p-4 flex justify-between items-center border-b ${mode === 'dark' ? 'bg-gray-800' : 'bg-white border-black'} transition duration-300 w-full`}>
      <AutoTyper mode={mode}/>
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button onClick={() => dispatch(toggleTheme())} className="text-xl sm:text-2xl md:text-3xl">
          {mode === 'dark' ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-gray-800" />
          )}
        </button>

        {/* Show menu icon for smaller screens */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl">
            <FaBars />
          </button>
        </div>

        {/* Full user info and login/logout for larger screens */}
        <div className="hidden md:flex items-center gap-4">
          {user.email ? (
            <div className="flex items-center gap-4 cursor-pointer">
              {/* Username Box */}
              <div className={`relative px-4 py-1 bg-${mode === 'dark' ? 'gray-700' : 'gray-100'} rounded-lg shadow-md border-${mode === 'dark' ? '' : 'black'}`}>
                <FaUser className={`absolute left-2 top-1/2 transform -translate-y-1/2 text-lg ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`} />
                <span className={`ml-8 text-lg sm:text-xl ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {user.name}
                </span>
              </div>

              <div
                className="px-4 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all duration-300 shadow-md"
                onClick={Logout}
              >
                Logout
              </div>
            </div>
          ) : (
            <button
              className="flex items-center gap-1 px-3 py-1 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
              onClick={LoginRedirect}
            >
              <FaSignInAlt />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Dropdown for smaller screens */}
        {menuOpen && (
          <div className={`absolute right-4 top-16 bg-${mode === 'dark' ? 'gray-800' : 'white'} rounded-md shadow-lg p-4 flex flex-col items-start gap-2 md:hidden border-${mode === 'dark' ? '' : 'black'}`}>
            {user.email ? (
              <>
                <div className="flex items-center gap-2">
                  <FaUser className={`text-xl ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`} />
                  <span className={`text-lg ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {user.name}
                  </span>
                </div>
                <button
                  className={`text-lg ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}
                  onClick={Logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="flex items-center gap-1 px-3 py-1 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                onClick={LoginRedirect}
              >
                <FaSignInAlt />
                <span>Login</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
