import { useAppSelector } from "app/hooks";
import Table from "components/Common/table/Table";
import React from "react";
import "./cart.scss";
type Props = {};

const Cart = (props: Props) => {
  const head = [
    "stt",
    "name",
    "image",
    "price",
    "quantity",
    "weight",
    "discount",
    "total",
  ];
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <div className="cart-page">
      <h2 className="cart-page__heading">Cart Page</h2>
      <Table head={head} dataCart={cartItems}></Table>
    </div>
  );
};

export default Cart;
