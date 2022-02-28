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

    removeCart(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      Cookies.set("cartItems", JSON.stringify(state.cartItems));
    },

    addQuantity(state, action: PayloadAction<string>) {
      const item = state.cartItems.find((item) => item._id === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },

    minusQuantity(state, action: PayloadAction<string>) {
      const item = state.cartItems.find((item) => item._id === action.payload);

      if (item) {
        item.quantity -= 1;
      }
    },

    clearCart(state) {
      state.cartItems = [];
    },
  },
});

//action
export const cartActions = cartSlice.actions;
//reducer
export default cartSlice.reducer;
