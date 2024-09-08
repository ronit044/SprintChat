"use client";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/redux/themeSlice';
import { FaSun, FaMoon, FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { logoutUser } from '@/utils/firbaseUtils';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const Navbar = () => {
  const dispatch = useDispatch();
  const router=useRouter();
  const mode = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.auth.user);
  const LoginRedirect=()=>{
    router.push("/auth");
  }
  const Logout=()=>{
    const response=logoutUser();
    if (response.success) {
      toast.success('Successfully LoggedOut!');
    } else {
      toast.error(response.error);
    }
  }
  return (
    <div className={`p-4 xl:p-10 flex justify-between items-center border-b ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} transition duration-300 w-100% h-1`}>
      <h1
        className={`text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}
      >
        Kanban Board
      </h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="text-xl sm:text-2xl md:text-3xl"
        >
          {mode === 'dark' ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-gray-800" />
          )}
        </button>

        {user.email ? (
          <div className="flex items-center gap-2 cursor-pointer">
            <FaUser className={`text-xl sm:text-2xl ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`} />
            <div className={`text-lg sm:text-xl ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {user.name || user.email} /</div>
            <div className={`text-lg sm:text-xl ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`} onClick={Logout}>
              Logout
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1 px-3 py-1 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300" onClick={LoginRedirect}
            >
              <FaSignInAlt />
              <span>Login</span>
            </button>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
