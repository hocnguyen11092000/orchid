import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListParams, ListResponse, Product } from "models";

export interface ProductState {
  loading: boolean;
  list: Product[];
  filter: ListParams;
  productCount?: number;
}

const initialState: ProductState = {
  loading: false,
  list: [],
  filter: {
    page: 1,
  },
  productCount: undefined,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProductList(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    fetchProductListSuccess(
      state,
      action: PayloadAction<ListResponse<Product>>
    ) {
      state.list = action.payload.products;
      state.productCount = action.payload.productCount;
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    fetchProductListFailed(state) {
      state.loading = false;
    },
    deleteProduct(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    deleteProductSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.list = state.list.filter((x) => x._id !== action.payload);
    },
    deleteProductFail(state) {
      state.loading = false;
    },
  },
});

//actions
export const productActions = productSlice.actions;

//reducer

export default productSlice.reducer;
