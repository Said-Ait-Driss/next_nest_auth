import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { UserState } from './features/auth/authSlice';

export interface RootState {
    user: UserState;
}

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});
