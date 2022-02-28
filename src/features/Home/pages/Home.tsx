import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Grid } from "@mui/material";
import orderApi from "api/orderApi";
import io from "socket.io-client";
import { useAppDispatch, useAppSelector } from "app/hooks";
import ProtectedRoute from "components/Common/protected-route/ProtectedRoute";
import TrSkeleton from "components/Common/tr-skeleton/TrSkeleton";
import ListOrder from "features/order/pages/ListOrder";
import { Order } from "models/order";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../components/card/Card";

import "./home.scss";

type Props = {};

export interface CardList {
  name: string;
  count: number;
  icon: any;
}

const chartOptions: any = {
  series: [
    {
      name: "Online Customers",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Store Customers",
      data: [40, 30, 70, 80, 40, 16, 40, 20],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

const head = [
  "id",
  "customer",
  "address",
  "name",
  "quantity",
  "weight",
  "total",
  "order Status",
  "action",
];

export const descData = (data: any) => {
  const temp: Array<any> = [];
  for (let index = data?.length - 1; index >= 0; index--) {
    temp.push(data[index]);
  }
  return temp;
};

const Home = (props: Props) => {
  const [status, setStatus] = useState<string>("Processing");
  const check = useAppSelector((state) => state.socket.check);
  const navigate = useNavigate();
  const [newOrder, setNewOrder] = useState<any>();
  const [order, setOrder] = useState<any>();
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.on("server", (data: any) => {
      const date = new Date();
      setNewOrder(data.orderItems._id + date.toISOString());
    });
  }, [check]);

  const [processing, setProcessing] = useState<any>();
  const [delivered, setdelivered] = useState<any>();
  const [refused, setrefused] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await orderApi.getAll();
        setOrder(descData(data.orders));
        setProcessing(data.processingCount);
        setdelivered(data.deliveredCount);
        setrefused(data.refusedCount);
      } catch (error) {
        console.log("Error: " + error);
      }
    })();
  }, [status]);

  const CardList: Array<CardList> = [
    {
      name: "Processing",
      count: processing,
      icon: <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>,
    },
    {
      name: "Delivered",
      count: delivered,
      icon: <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>,
    },
    {
      name: "Refused",
      count: refused,
      icon: <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>,
    },
    {
      name: "Total Sales",
      count: 1200,
      icon: <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>,
    },
  ];

  const handleChangeStatus = async (id: string, status: any) => {
    setLoading(true);
    try {
      await orderApi.update(id, status);
      toast.success("Update status successfully");
      setStatus(status);
      setLoading(false);
      navigate("/orderList");
    } catch (error: any) {
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Grid container>
        <Grid item md={6} xs={6} sm={12} className="home__card-container">
          <Card listCard={CardList}></Card>
        </Grid>
        <Grid item md={6} xs={6} sm={12}>
          <div className="home__char">
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type="line"
              height="100%"
            ></Chart>
          </div>
        </Grid>
      </Grid>
      <div className="home__recent-order">
        <h2>Recent Orders</h2>
        {
          <ListOrder
            mg={0}
            onChangeStatus={handleChangeStatus}
            head={head}
            dataOrders={order}
            loading={loading}
          ></ListOrder>
        }
        <ProtectedRoute></ProtectedRoute>
      </div>
    </div>
  );
};

export default Home;
