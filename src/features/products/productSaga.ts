import { PayloadAction } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import { ListParams, ListResponse, Product } from "models";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { productActions } from "./productSlice";

function* fetchProductList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Product> = yield call(
      productApi.getAll,
      action.payload
    );

    yield put(productActions.fetchProductListSuccess(response));
  } catch (error) {
    console.log("Failed to fetch student list", error);
    yield put(productActions.fetchProductListFailed());
  }
}

function* deleteProduct(action: PayloadAction<any>) {
  try {
    yield call(productApi.remove, action.payload);

    yield put(productActions.deleteProductSuccess(action.payload));
  } catch (error) {
    yield put(productActions.deleteProductFail());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(productActions.setFilter(action.payload));
}

export default function* productSaga() {
  yield takeLatest(productActions.fetchProductList, fetchProductList);
  yield takeLatest(productActions.deleteProduct, deleteProduct);

  yield debounce(
    500,
    productActions.setFilterWithDebounce.type,
    handleSearchDebounce
  );
}
