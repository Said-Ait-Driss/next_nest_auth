import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/redux';

export interface UserState {
    isLoggedIn: boolean;
    user: {
        firstName: string;
        email: string;
        username: string;
    };
}

const initialState: UserState = {
    isLoggedIn: false,
    user: {
        firstName: '',
        email: '',
        username: '',
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SET_LOGIN(state, action) {
            state.isLoggedIn = action.payload;
        },
        SET_USER(state, action) {
            const profile = action.payload;
            state.user.firstName = profile.name;
            state.user.username = profile.name;
            state.user.email = profile.email;
        },
    },
});

export const { SET_LOGIN, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUser = (state: RootState) => state.user.user;

export default authSlice.reducer;
