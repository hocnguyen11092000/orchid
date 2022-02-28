import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import orderApi from "api/orderApi";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./checkout.scss";
import ShippingForm from "./components/ShippingForm";
import Cookies from "js-cookie";
import { useAppDispatch } from "app/hooks";
import { cartActions } from "../cart/cartSlice";
import io from "socket.io-client";
import { socketAcions } from "features/socket/socketSlice";
type Props = {};

const CheckOut = (props: Props) => {
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  const { state } = useLocation() as any;
  const dispatch = useAppDispatch();

  const cartItems = state.cartItems;
  const total = cartItems.reduce(
    (x: number, y: any) =>
      x + y.price * y.quantity - (y.price * y.quantity * y.discount) / 100,
    0
  );

  const sum = total + 30;

  const handleFormSubmit = async (values: any) => {
    cartItems.forEach((item: any) => {
      item.product = item._id;
    });
    const data: any = {
      itemsPrice: total,
      shippingPrice: 30,
      shippingInfo: values,
      totalPrice: sum,
      orderItems: cartItems,
      paymentInfo: {
        id: "sample payment Info",
        status: "status",
      },
    };
    try {
      await orderApi.add(data);
      Cookies.remove("cartItems");
      dispatch(cartActions.clearCart());
      socket.emit("sendOrder", data);
      dispatch(socketAcions.sendData(data));
      toast.success("successfully");
    } catch (error) {
      toast.error("fail to add order");
    }
  };

  return (
    <div className="check-out">
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper elevation={0} sx={{ padding: "20px" }}>
            <Typography component="h2" variant="h5">
              Shipping info
            </Typography>
            <ShippingForm onSubmit={handleFormSubmit}></ShippingForm>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ padding: "20px" }}>
            <Typography>Shipping cart</Typography>
            <Box>
              {cartItems.map((item: any, index: number) => {
                return (
                  <div className="item" key={index}>
                    <img src={item.image} alt="" className="item__img" />
                    <div className="item__info">
                      <p>{item.name}</p>
                      <p>{item.quantity}</p>
                    </div>
                    <p className="item__total">
                      {(
                        ((item.price * (100 - item.discount)) / 100) *
                        item.quantity
                      ).toFixed(3)}
                      .đ
                    </p>
                  </div>
                );
              })}
              <h3>Shipping price: 30.000đ</h3>
              <h3 style={{ margin: "15px 0" }}>Total: {sum.toFixed(3)}đ</h3>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckOut;
