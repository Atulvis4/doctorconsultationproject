import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice'; // Adjust path as necessary

export const store = configureStore({
  reducer: {
    user: userReducer,
    
  },
});
