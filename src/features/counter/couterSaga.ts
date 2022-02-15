import { PayloadAction } from "@reduxjs/toolkit";
import { takeEvery, delay, put } from "redux-saga/effects";
import { incrementSaga, incrementSagaSuccess } from "./counterSlice";

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log("Waiting 1s");
  // Wait 1s
  yield delay(1000);

  console.log("Waiting done, dispatch action");

  // Dispatch action success
  yield put(incrementSagaSuccess(action.payload));
}

export default function* couterSaga() {
  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
}
