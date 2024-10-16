import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice.ts';
import authReducer from './slices/authSlice.ts';

const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;