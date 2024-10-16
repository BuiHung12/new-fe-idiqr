import apiClient from "./http.api.ts";
import {AuthState} from "../stores/slices/authSlice.ts";

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface SecurityCodePayload {
  code: string;
}

export interface NewPasswordData {
  newPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = (loginPayload: LoginRequest): Promise<AuthState> =>
  apiClient.post<AuthState>('login', { ...loginPayload }).then(({ data }) => data);

export const signUp = (signUpData: SignUpRequest): Promise<undefined> =>
  apiClient.post<undefined>('signUp', { ...signUpData }).then(({ data }) => data);

export const resetPassword = (resetPasswordPayload: ResetPasswordRequest): Promise<undefined> =>
  apiClient.post<undefined>('forgotPassword', { ...resetPasswordPayload }).then(({ data }) => data);

export const verifySecurityCode = (securityCodePayload: SecurityCodePayload): Promise<undefined> =>
  apiClient.post<undefined>('verifySecurityCode', { ...securityCodePayload }).then(({ data }) => data);

export const setNewPassword = (newPasswordData: NewPasswordData): Promise<undefined> =>
  apiClient.post<undefined>('setNewPassword', { ...newPasswordData }).then(({ data }) => data);
