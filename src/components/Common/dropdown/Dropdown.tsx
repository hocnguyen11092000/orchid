import { useAppDispatch } from "app/hooks";
import { logout } from "features/auth/authSlice";
import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import "./dropdown.scss";

type Props = {
  user: string;
  content: Array<string>;
  name: string;
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
  const dispatch = useAppDispatch();
  const toggleRef = useRef(null);
  const contentRef = useRef(null);

  clickOutSide(toggleRef, contentRef);

  return (
    <div className="dropdown">
      <div className="User" ref={toggleRef}>
        <img src={props?.user} alt="" className="dropdown__img" />
        <span className="dropdown__name">{props?.name}</span>
      </div>

      <div className="dropdown__content" ref={contentRef}>
        <ul className="dropdown__content-list">
          {/* {props?.content.map((item, index) => {
            return (
              <li className="dropdown__content-item" key={index}>
                {item}
              </li>
            );
          })} */}
          <li className="dropdown__content-item">
            <span>
              <NavLink to={`add-edit-user/${props?._id}`}>edit profile</NavLink>
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
      </div>
    </div>
  );
};

export default Dropdown;
