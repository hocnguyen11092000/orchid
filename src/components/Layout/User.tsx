import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ProtectedRoute from "components/Common/protected-route/ProtectedRoute";
import Cart from "features/user-page/cart/Cart";
import DetailProduct from "features/user-page/pages/detailProduct/DetailProduct";
import ListProduct from "features/user-page/pages/listProduct/ListProduct";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useAppSelector } from "app/hooks";
import CheckOut from "features/user-page/checkout/CheckOut";

type Props = {};

const UserLayout = (props: Props) => {
  const cart = useAppSelector((state) => state.cart.cartItems);
  let count = 0;
  cart.forEach((item) => (count += item.quantity));
  return (
    <>
      <AppBar position="static" sx={{ background: "#349eff" }}>
        <Toolbar sx={{ paddingLeft: "0 !important" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>

          <Typography
            sx={{ color: "#fff", flexGrow: 1 }}
            variant="h6"
            component="div"
          >
            <Link to="/user/product" style={{ color: "#fff" }}>
              Orchid
            </Link>
          </Typography>

          <Link to="/user/cart">
            <IconButton sx={{ color: "#fff" }}>
              <Badge badgeContent={count} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          <Button color="inherit" size="small">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route element={<ProtectedRoute></ProtectedRoute>}>
          {/* product */}
          <Route path="/product" element={<ListProduct></ListProduct>}></Route>
          <Route path="/checkout" element={<CheckOut></CheckOut>}></Route>
          <Route
            path="/product/:id"
            element={<DetailProduct></DetailProduct>}
          ></Route>
          {/* cart */}
          <Route path="/cart" element={<Cart></Cart>}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default UserLayout;
