import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
export interface SocketData {
  data: Array<any>;
  check: number;
}
const initialState: SocketData = {
  data: [],
  check: 0,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    sendData(state, action: PayloadAction<any>) {
      state.data.push(action.payload);
    },
    setCheck(state) {
      state.check += 1;
    },
    setCheck2(state) {
      state.check += 1;
    },
  },
});

//actions
export const socketAcions = socketSlice.actions;

//reducer
export default socketSlice.reducer;
