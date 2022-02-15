import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ForgotValues } from "features/user/pages/fogot-password/FogotPassword";
import { User } from "../../models/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthState {
  isLogIn: boolean;
  logging: boolean;
  currentUser?: User;
}

export interface ForgotPaload {
  values: ForgotValues;
  token: string;
}

const initialState: AuthState = {
  isLogIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLogIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
    },
    logout(state) {
      state.isLogIn = false;
      state.currentUser = undefined;
    },
    resetPassword(state, action: PayloadAction<ForgotPaload>) {
      state.logging = true;
    },
    resetPasswordSuccess(state, action: PayloadAction<User>) {
      state.isLogIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },
    resetPasswordFail(state, action: PayloadAction<string>) {
      state.logging = false;
    },
  },
});

//actions
export const {
  login,
  loginSuccess,
  loginFailed,
  logout,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFail,
} = authSlice.actions;

//selector
export const selectisLogIn = (state: any) => state.auth.isLogIn;
export const selectLoging = (state: any) => state.auth.logging;
export const selectCurrentUser = (state: any) => state.auth.currentUser;

//reducers
const reducer = authSlice.reducer;
export default reducer;
