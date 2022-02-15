import { Skeleton } from "@mui/material";
import React from "react";

type Props = {};

const TrSkeleton = (props: Props) => {
  return <Skeleton height={76} sx={{ width: "700px" }}></Skeleton>;
};

export default TrSkeleton;
