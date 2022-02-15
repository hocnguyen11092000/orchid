import Login from "features/auth/pages/Login";
import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
interface Props {}

const ProtectedRoute = (props: Props) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const token = localStorage.getItem("token");

  return currentUser || token ? <Outlet></Outlet> : <Login></Login>;
};

export default ProtectedRoute;
