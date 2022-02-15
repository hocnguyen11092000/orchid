import ProtectedRoute from "components/Common/protected-route/ProtectedRoute";
import Cart from "features/user-page/cart/Cart";
import DetailProduct from "features/user-page/pages/detailProduct/DetailProduct";
import ListProduct from "features/user-page/pages/listProduct/ListProduct";
import React from "react";
import { Route, Routes } from "react-router-dom";

type Props = {};

const UserLayout = (props: Props) => {
  return (
    <Routes>
      <Route element={<ProtectedRoute></ProtectedRoute>}>
        {/* product */}
        <Route path="/product" element={<ListProduct></ListProduct>}></Route>
        <Route
          path="/product/:id"
          element={<DetailProduct></DetailProduct>}
        ></Route>
        {/* cart */}
        <Route path="/cart" element={<Cart></Cart>}></Route>
      </Route>
    </Routes>
  );
};

export default UserLayout;
