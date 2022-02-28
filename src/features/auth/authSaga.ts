import { toast } from "react-toastify";
import { push } from "@lagunovsky/redux-react-router";
import { PayloadAction } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import axios from "axios";
import { ForgotValues } from "features/user/pages/fogot-password/FogotPassword";
import { ListResponse } from "models";
import { call, put, takeEvery } from "redux-saga/effects";
import { User } from "./../../models/user";
import {
  ForgotPaload,
  login,
  loginFailed,
  LoginPayload,
  loginSuccess,
  logout,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFail,
} from "./authSlice";

// function Login(payload: PayloadAction<LoginPayload>) {
//   const apiClient = axios.create({
//     baseURL: "http://localhost:4000",
//     withCredentials: true,
//   });
//   const config = { headers: { "Content-Type": "application/json" } };
//   return apiClient.post(`/api/v1/login`, payload.payload, config);
// }

function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const res: User = yield call(userApi.login, action.payload);

    localStorage.setItem("token", res.token);
    localStorage.setItem("currentUser", JSON.stringify(res.user));

    yield put(loginSuccess(res.user));
    yield put(push("/"));
  } catch (error: any) {
    yield put(loginFailed(error.message));
    toast.error(error.response.data.error);
  }
}

function* handleResetPassword(action: PayloadAction<ForgotPaload>) {
  const { values, token } = action.payload;
  if (token) {
    try {
      const res: User = yield call(userApi.resetPassword, token, values);

      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      if (res.user) {
        localStorage.setItem("currentUser", JSON.stringify(res.user));

        yield put(resetPasswordSuccess(res.user));
        toast.success("success");
        yield put(push("/"));
      }
    } catch (error: any) {
      yield put(resetPasswordFail(error.message));
    }
  }
}

// const Logout = () => {
//   const apiClient = axios.create({
//     baseURL: "http://localhost:4000",
//     withCredentials: true,
//   });
//   return apiClient.get("/api/v1/logout");
// };

function* handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");

  yield call(userApi.logout);
  yield put(push("/admin/login"));
}

export default function* couterSaga() {
  yield takeEvery(login.type, handleLogin);
  yield takeEvery(logout.type, handleLogout);
  yield takeEvery(resetPassword.type, handleResetPassword);
}
