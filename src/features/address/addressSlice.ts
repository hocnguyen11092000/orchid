import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import addressApi from "api/addressApi";
import { Address, ListParams, ListResponse } from "models";

export interface AddressState {
  loading: boolean;
  list: Address[];
  filter: ListParams;
  addressCount: number | undefined;
}

const initialState: AddressState = {
  loading: false,
  list: [],
  filter: {
    page: 1,
  },
  addressCount: 0,
};

export const fetchAddress = createAsyncThunk(
  "address",
  async (params: ListParams) => {
    const data = await addressApi.getAll(params);
    return {
      data: data.addresss,
      count: data.addressCount,
    };
  }
);

const addressSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAddress.fulfilled,
        (state: any, action: PayloadAction<ListResponse<Address>>) => {
          state.list = action.payload.data;
          state.addressCount = action.payload.count;
        }
      );
  },
});

//actions
export const { setFilter } = addressSlice.actions;

//reducer

export default addressSlice.reducer;
