import AdminLayout from "components/Layout/Admin";
import Login from "features/auth/pages/Login";
import React from "react";
import { Route, Routes } from "react-router";
import UserLayout from "./components/Layout/User";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login></Login>} />
      <Route path="/user/*" element={<UserLayout></UserLayout>} />
      <Route path="/*" element={<AdminLayout></AdminLayout>} />
    </Routes>
  );
}
