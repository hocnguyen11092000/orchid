import { Badge, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { logout } from "features/auth/authSlice";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { io } from "socket.io-client";
import "./dropdown.scss";

type Props = {
  user?: string;
  content?: Array<string>;
  name?: string;
  icon?: any;
  _id?: string;
};

const clickOutSide = (toggleRef: any, contentRef: any) => {
  document.addEventListener("mousedown", (e: any) => {
    if (toggleRef?.current && toggleRef.current.contains(e.target)) {
      contentRef.current.classList.toggle("active");
    } else {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        contentRef.current.classList.remove("active");
      }
    }
  });
};

const Dropdown = (props: Props) => {
  const [socket, setSocket] = useState<any>();
  const [count, setCount] = useState<number>(0);
  const check = useAppSelector((state) => state.socket.check);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  const dispatch = useAppDispatch();
  const toggleRef = useRef(null);
  const contentRef = useRef(null);

  clickOutSide(toggleRef, contentRef);

  return (
    <div className="dropdown">
      <div className="User" ref={toggleRef}>
        <img src={props?.user} alt="" className="dropdown__img" />
        {props.icon ? (
          <IconButton sx={{ color: "#fff" }}>
            <Badge badgeContent={check} color="error">
              {props.icon}
            </Badge>
          </IconButton>
        ) : null}
        {props.icon ? (
          ""
        ) : (
          <span className="dropdown__name">{props?.name}</span>
        )}
      </div>

      <div className="dropdown__content" ref={contentRef}>
        {props.user && (
          <ul className="dropdown__content-list">
            <li className="dropdown__content-item">
              <span>
                <NavLink to={`add-edit-user/${props?._id}`}>
                  edit profile
                </NavLink>
              </span>
            </li>
            <li className="dropdown__content-item">
              {localStorage.getItem("token") ? (
                <span onClick={() => dispatch(logout())}>Logout</span>
              ) : (
                <NavLink to="/admin/login">Login</NavLink>
              )}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
