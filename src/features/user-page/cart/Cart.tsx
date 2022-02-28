import { useAppSelector } from "app/hooks";
import Table from "components/Common/table/Table";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./cart.scss";
type Props = {};

const Cart = (props: Props) => {
  const navigate = useNavigate();
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
  const itemsPrice = cartItems
    .reduce((x, y) => x + y.quantity * y.price, 0)
    .toFixed(3);

  const handleCheckOut = (items: any) => {
    navigate("/user/checkout", { state: { cartItems } });
  };

  return (
    <div className="cart-page">
      <h2 className="cart-page__heading">Cart Page</h2>
      {cartItems.length <= 0 ? (
        <h3 style={{ textAlign: "center" }}>Cart is empty...</h3>
      ) : (
        <>
          <Table head={head} dataCart={cartItems}></Table>
          <div className="cart-page__total">
            <span>{itemsPrice}đ</span>
          </div>
          <div className="cart-page__submit">
            <button onClick={() => handleCheckOut(cartItems)}>Check out</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
