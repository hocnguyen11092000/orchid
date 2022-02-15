import React from "react";
import "./popup.scss";

type Props = {
  children?: React.ReactNode;
  active?: boolean;
};

const Popup = (props: Props) => {
  const { children, active } = props;
  return <div className={`popup ${active ? "active" : ""}`}>{children}</div>;
};

export default Popup;
