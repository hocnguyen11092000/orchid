import { Skeleton } from "@mui/material";
import React from "react";
import "./tableskelaton.scss";

type Props = {};

const TableSkelaton = (props: Props) => {
  return (
    <div className="table-skelaton">
      <Skeleton height={60}></Skeleton>
      <Skeleton height={60}></Skeleton>
      <Skeleton height={60}></Skeleton>
      <Skeleton height={60}></Skeleton>
      <Skeleton height={60}></Skeleton>
    </div>
  );
};

export default TableSkelaton;
