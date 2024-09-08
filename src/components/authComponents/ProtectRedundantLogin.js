"use client"
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/authComponents/authProvider'; 
import Loader from '@/components/loader'; 

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, loading, router]);

  if (loading) {
    return <Loader />;
  }

  return !isLoggedIn ? children : null;
};

export default ProtectedRoute;
