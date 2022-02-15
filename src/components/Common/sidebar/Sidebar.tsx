import React, { useRef } from "react";
import "./sidebar.scss";
import Cookies from "js-cookie";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { logout } from "features/auth/authSlice";
type Props = {};
const Sidebar = (props: Props) => {
  const subRef = useRef<any>();
  const userRef = useRef<any>();
  const orderRef = useRef<any>();
  const addressRef = useRef<any>();

  const { pathname } = useLocation();

  const handleActive = (el: any) => {
    el.current.classList.toggle("active");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Link to="/">
          <img src="https://nguoinoitieng.tv/images/nnt/96/0/bbi0.jpg" alt="" />
        </Link>
      </div>
      <div className="sidebar__menu">
        <ul className="sidebar__menu-list">
          <li
            className={`sidebar__menu-item ${
              pathname.includes("product") ? "active" : ""
            }`}
            onClick={() => handleActive(subRef)}
          >
            <div className="sidebar__menu-item-heading">
              <FolderOpenIcon></FolderOpenIcon>
              <span>Product</span>
            </div>
            <div ref={subRef} className="sidebar__menu-item-product">
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/productList">List Product</Link>
              </span>
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/add-edit-product/add">Add Product</Link>
              </span>
            </div>
          </li>
          <li
            className={`sidebar__menu-item ${
              pathname.includes("address") ? "active" : ""
            }`}
            onClick={() => handleActive(addressRef)}
          >
            <div className="sidebar__menu-item-heading">
              <FolderOpenIcon></FolderOpenIcon>
              <span>Address</span>
            </div>
            <div ref={addressRef} className="sidebar__menu-item-product">
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/address">List Address</Link>
              </span>
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/address">Add </Link>
              </span>
            </div>
          </li>
          <li
            className={`sidebar__menu-item ${
              pathname.includes("user") ? "active" : ""
            }`}
            onClick={() => handleActive(userRef)}
          >
            <div className="sidebar__menu-item-heading">
              <FolderOpenIcon></FolderOpenIcon>
              <span>User</span>
            </div>
            <div ref={userRef} className="sidebar__menu-item-product">
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/userList">List User</Link>
              </span>
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/add-edit-user">Add User</Link>
              </span>
            </div>
          </li>
          <li
            className={`sidebar__menu-item ${
              pathname.includes("order") ? "active" : ""
            }`}
            onClick={() => handleActive(orderRef)}
          >
            <div className="sidebar__menu-item-heading">
              <FolderOpenIcon></FolderOpenIcon>
              <span>Order</span>
            </div>
            <div ref={orderRef} className="sidebar__menu-item-product">
              <span className="sidebar__menu-item-product-sub-product">
                <Link to="/orderList">List Order</Link>
              </span>
              {/* <span className="sidebar__menu-item-product-sub-product">
                <Link to="/add-edit-user">Add User</Link>
              </span> */}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
