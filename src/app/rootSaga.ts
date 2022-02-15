import authSaga from "features/auth/authSaga";
import couterSaga from "features/counter/couterSaga";
import productSaga from "features/products/productSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([couterSaga(), authSaga(), productSaga()]);
}
