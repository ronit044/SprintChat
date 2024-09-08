// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/redux/themeSlice';
import authReducer from "@/redux/userSlice"

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth:authReducer,
  },
});

export default store;
