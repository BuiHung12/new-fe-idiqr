import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
    reducer: rootReducer,
    // thêm các middleware khác nếu cần
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;