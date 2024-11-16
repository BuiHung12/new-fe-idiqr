import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "../store.ts";
import {RoleSidebar, RoleSidebarVisibility} from "../../constant/roles.ts";

export interface AuthState {
    token: string | null;
    username: string ;
    name: string;
    image: string | null;
    role: string;
    roleSidebarVisible: RoleSidebarVisibility;
}

const getRoleSidebarVisible = (role: any) => {
    switch (role) {
        case 'ROLE_ADMIN':
            return RoleSidebar.ROLE_ADMIN;
        case 'ROLE_COMPANY':
            return RoleSidebar.ROLE_COMPANY;
        case 'ROLE_STAFF':
            return RoleSidebar.ROLE_STAFF;
        case 'ROLE_DAILY':
            return RoleSidebar.ROLE_DAILY;
        case 'ROLE_DAILY_2':
            return RoleSidebar.ROLE_DAILY_2;
        case 'ROLE_DAILY_3':
            return RoleSidebar.ROLE_DAILY_3;
        case 'ROLE_UP_TIN':
            return RoleSidebar.ROLE_UP_TIN;
        default:
            return RoleSidebar.ROLE_GUEST;
    }
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username') ?? "Guest",
    name: localStorage.getItem('name') ?? "Guest",
    image: localStorage.getItem('image'),
    role: localStorage.getItem('role') ?? "ROLE_GUEST",
    roleSidebarVisible: getRoleSidebarVisible(localStorage.getItem('role'))
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuth: (state, action: PayloadAction<AuthState>) => {
            state.username = action.payload.username;
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.image = action.payload.image;
            state.role = action.payload.role;
            state.roleSidebarVisible = getRoleSidebarVisible(action.payload.role);
            if (typeof action.payload.token === "string") {
                localStorage.setItem('token', action.payload.token);
            }
            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('name', action.payload.name);
            if (typeof action.payload.image === "string") {
                localStorage.setItem('image', action.payload.image);
            }
            localStorage.setItem('role', action.payload.role);
    },
        clearAuth: (state) => {
            state.username = "Guest";
            state.name = "Guest";
            state.token = null;
            state.image = null;
            state.role = "ROLE_GUEST";
            state.roleSidebarVisible = RoleSidebar.ROLE_GUEST;
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('name');
            localStorage.removeItem('image');
            localStorage.removeItem('role');
        },
    },
});

export const { updateAuth, clearAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;