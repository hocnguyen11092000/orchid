import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  discount: number;
  weight: number;
  quantity: number;
}
export interface CartState {
  cartItems: Array<CartItem>;
}
const cartCookie = Cookies.get("cartItems");
const initialState: CartState = {
  cartItems: (cartCookie && JSON.parse(cartCookie)) || [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;

      const index = state.cartItems.findIndex((x) => x._id === newItem._id);
      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
      Cookies.set("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

//action
export const cartActions = cartSlice.actions;
//reducer
export default cartSlice.reducer;
