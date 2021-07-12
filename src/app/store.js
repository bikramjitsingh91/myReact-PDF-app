import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/services/serviceCallSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: usersReducer
  },
});
