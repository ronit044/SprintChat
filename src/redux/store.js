// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/redux/themeSlice';
import authReducer from "@/redux/userSlice"
import taskSlice from '@/redux/taskSlice';
const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth:authReducer,
    tasks:taskSlice,
  },
});

export default store;
