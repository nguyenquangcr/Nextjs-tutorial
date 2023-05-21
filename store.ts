import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import medicineReducer from './slices/medicineSlice';
import userReducer from './slices/userSlice';
import postUserReducer from './slices/postUser';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    medicine: medicineReducer,
    user: userReducer,
    postUser: postUserReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
