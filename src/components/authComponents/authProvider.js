"use client";
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/userSlice'; // Redux action to set the user
import { auth } from '@/firebase/firebaseConfig';
import { fetchDocumentById } from '@/utils/firbaseUtils';
const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let name=null;
        try{
          name=await fetchDocumentById("users",user.uid);
          console.log(name);
        }
        catch(e){
          console.log(e);
        }
            dispatch(setUser({
              uid: user.uid,
              email: user.email,
              name: name.username,
            }));
          }  else {
        dispatch(setUser());
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};

export default AuthWrapper;
