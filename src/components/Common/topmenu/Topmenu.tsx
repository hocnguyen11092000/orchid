import { useAppSelector } from "app/hooks";
import { User } from "models";
import React from "react";
import Dropdown from "../dropdown/Dropdown";
import "./topmenu.scss";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
type Props = {};

const Topmenu = (props: Props) => {
  let user = localStorage.getItem("currentUser");

  let count = useAppSelector((state) => state.socket.check);
  let currentUser;
  if (user) {
    currentUser = JSON.parse(user);
  }

  const userRedux: any = useAppSelector((state) => state.user.list);
  const userAuth: any = useAppSelector((state) => state.auth.currentUser);

  const userData = ["edit profile"];

  return (
    <div className="topmenu">
      <Dropdown
        name={userAuth?.name || userRedux?.name || currentUser?.name}
        user={
          userAuth?.avatar?.url ||
          // userRedux?.avatar?.url ||
          currentUser?.avatar.url
        }
        content={userData}
        _id={userAuth?._id || userRedux?._id || currentUser?._id}
      ></Dropdown>
      <Dropdown
        icon={<NotificationsNoneIcon color="primary"></NotificationsNoneIcon>}
        content={userData}
      ></Dropdown>
      {/* <span>{count}</span> */}
    </div>
  );
};

export default Topmenu;
