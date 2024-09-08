// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    uid: null,     // Firebase unique user ID
    email: null,   // User's email
    name: null,    // User's display name (if available)
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        // If user is signed in, update state with user's details
        state.user.uid = action.payload.uid;
        state.user.email = action.payload.email;
        state.user.name = action.payload.displayName || null; // Firebase displayName (optional)
      } else {
        // If no user, reset the state to null
        state.user = {
          uid: null,
          email: null,
          name: null,
        };
      }
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
