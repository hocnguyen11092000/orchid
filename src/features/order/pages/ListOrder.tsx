import orderApi from "api/orderApi";
import { useAppSelector } from "app/hooks";
import Table from "components/Common/table/Table";
import { descData } from "features/Home/pages/Home";
import { Order } from "models/order";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";
import "./listorder.scss";

type Props = {
  head?: Array<string>;
  dataOrders?: Array<Order>;
  onChangeStatus?: (id: string, status: any) => void;
  loading?: boolean;
  mg?: number;
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
  "actions",
];

const ListOrder = (props: Props) => {
  const [socket, setSocket] = useState<any>();
  const check = useAppSelector((state) => state.socket.check);
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  const [order, setOrder] = useState<Order[]>();
  const [newOrder, setNewOrder] = useState<any>();
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    socket?.on("server", (data: any) => {
      const date = new Date();
      setNewOrder(data.orderItems._id + date.toISOString());
    });
  }, [check]);

  useEffect(() => {
    (async () => {
      try {
        const data = await orderApi.getAll();
        setOrder(descData(data.orders));
      } catch (error) {
        console.log("Error: " + error);
      }
    })();
  }, [render, newOrder]);

  const handleDeleteOrder = async (id: string) => {
    try {
      await orderApi.remove(id);
      toast.success("Delete order successfully");
      setRender(!render);
    } catch (error) {
      toast.error("Delete order fail");
    }
  };
  const { onChangeStatus, loading, mg } = props;
  return (
    <div className={`order`} style={{ margin: `20px ${mg}` }}>
      <Table
        head={head}
        dataOrders={order}
        onChangeStatus={onChangeStatus}
        loadingStatus={loading}
        onDeleteOrder={handleDeleteOrder}
      ></Table>
    </div>
  );
};

export default ListOrder;
