"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/userSlice'; // Redux action to set the user
import { fetchDocumentById } from '@/utils/firbaseUtils';
const AuthContext = createContext();

export default function AuthProvider ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await fetchDocumentById("users", user.uid);
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          name: userData.username || 'Unknown',
        }));
        setIsLoggedIn(true);
      } else {
        dispatch(setUser({
          uid: null,
          email: null,
          name: null,
        }));
        setIsLoggedIn(false);
      }
      setLoading(false); 
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
