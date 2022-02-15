import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import { useAppSelector } from "app/hooks";
import { Address, ListParams, Product, User } from "models";
import { Order } from "models/order";
import React, { useState } from "react";
import Popup from "../popup/Popup";
import "./table.scss";
import CloseIcon from "@mui/icons-material/Close";
import TrSkeleton from "../../Common/tr-skeleton/TrSkeleton";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  discount: number;
  weight: number;
  quantity: number;
}

type Props = {
  head: any;
  data?: Product[];
  dataAddress?: Address[];
  dataUser?: User[];
  dataOrders?: Order[];
  dataCart?: CartItem[];
  count?: number | undefined;
  pagination?: (item: number) => void;
  filter?: ListParams;
  onEditProduct?: (id: string) => void;
  onDeleteProduct?: (id: string) => void;
  onChangeStatus?: (id: string, status: any) => void;
  onDeleteOrder?: (id: string) => void;
  loadingStatus?: boolean;
  loading?: boolean;
};

const Table = (props: Props) => {
  const [popup, setPopup] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Processing");
  const [idOrder, setIdOrder] = useState<string>("");
  const [idRemove, setIdRemove] = useState<string>("");

  const {
    data,
    head,
    count,
    filter,
    pagination,
    dataAddress,
    dataUser,
    dataOrders,
    dataCart,
    onEditProduct,
    onDeleteProduct,
    onChangeStatus,
    onDeleteOrder,
    loadingStatus,
  } = props;

  const loading = useAppSelector((state) => state.product.loading);
  let totalPage = 0;
  if (count) {
    totalPage = Math.ceil(count / 8);
  }

  const handlePagiantion = (index: number) => {
    if (pagination) {
      pagination(index);
    }
  };

  const handleEditProduct = async (id: string) => {
    if (onEditProduct) {
      await onEditProduct(id);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setIdRemove(id);
    if (onDeleteProduct) {
      await onDeleteProduct(id);
    }
  };

  const handleEditOrder = (id: string) => {
    setPopup(!popup);
    setIdOrder(id);
  };

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    const param = status;
    setPopup(false);

    if (onChangeStatus) {
      await onChangeStatus(idOrder, param);
    }
  };

  const hadleDeleteOrder = async (id: string) => {
    if (onDeleteOrder) {
      await onDeleteOrder(id);
    }
  };
  return (
    <div className="table">
      <Popup active={popup}>
        <h5 className="popup__heading">Update status</h5>
        <div className="popup__form">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={handleStatusChange}
              name="status"
            >
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Shipping">Shipping</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Refused">Refused</MenuItem>
            </Select>
          </FormControl>
          <button onClick={handleUpdateStatus}>
            {loadingStatus ? (
              <CircularProgress
                size={16}
                sx={{ color: "#fff" }}
              ></CircularProgress>
            ) : (
              "Cập nhật"
            )}
          </button>
        </div>
        <div className="popup__close-icon" onClick={() => setPopup(false)}>
          <CloseIcon></CloseIcon>
        </div>
      </Popup>
      <table>
        <thead>
          <tr>
            {head.map((item: any, index: number) => {
              if (item.includes("action")) {
                return (
                  <th colSpan={2} key={index}>
                    {item}
                  </th>
                );
              } else {
                return <th key={index}>{item}</th>;
              }
            })}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: Product, index: number) => {
              return (
                <tr key={index}>
                  <>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <img
                        src={item.images[0].url}
                        alt={item.name}
                        className="img"
                      />
                    </td>
                    <td>{item.weight}</td>
                    <td>{item.category}</td>
                    <td>{item.stock}</td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditProduct(item._id)}
                    >
                      <span className="table-edit">Sửa</span>
                    </td>
                    {loading && idRemove === item._id ? (
                      <td>Đang xóa...</td>
                    ) : (
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteProduct(item._id)}
                      >
                        <span className="table-delete">Xóa</span>
                      </td>
                    )}
                  </>
                </tr>
              );
            })}

          {dataOrders &&
            dataOrders.map((item: Order, index: number) => {
              return (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.shippingInfo.name}</td>
                  <td>{item.shippingInfo.address}</td>
                  <td>{item.orderItems[0].name}</td>
                  <td>{item.orderItems[0].quantity}</td>
                  <td>{item.orderItems[0].weight}</td>
                  <td>{item.itemsPrice}</td>
                  <td>
                    <span className={item.orderStatus}>{item.orderStatus}</span>
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditOrder(item._id)}
                  >
                    <span className="table-edit">Sửa</span>
                  </td>
                  {loading ? (
                    <td>Đang xóa...</td>
                  ) : (
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => hadleDeleteOrder(item._id)}
                    >
                      <span className="table-delete">Xóa</span>
                    </td>
                  )}
                </tr>
              );
            })}
          {dataAddress &&
            dataAddress.map((item: Address, index: number) => {
              return (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.user}</td>
                  <td>{item.company}</td>

                  <td>{item.address}</td>
                  <td>{item.phoneNumber}</td>
                </tr>
              );
            })}
          {dataUser &&
            dataUser.map((item: User, index: number) => {
              return (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>

                  <td>
                    <img
                      src={item.avatar?.url}
                      alt={item.name}
                      className="img"
                    />
                  </td>
                  <td>{item.role}</td>
                </tr>
              );
            })}
          {dataCart &&
            dataCart.map((item: CartItem, index: number) => {
              return (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>
                    <img src={item.image} alt={item.name} width="60px" />
                  </td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.weight} kg</td>
                  <td>{item.discount}%</td>
                  <td>
                    {((item.price * (100 - item.discount)) / 100) *
                      item.quantity}
                    .000đ
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditOrder(item._id)}
                  >
                    <span className="table-edit">Sửa</span>
                  </td>
                  {loading ? (
                    <td>Đang xóa...</td>
                  ) : (
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => hadleDeleteOrder(item._id)}
                    >
                      <span className="table-delete">Xóa</span>
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="pagination">
        <ul className="pagination__list">
          {Array.from(new Array(totalPage)).map((_, index) => (
            <li
              className={`pagination__list-item ${
                filter?.page == index + 1 ? "active" : ""
              }`}
              key={index}
              onClick={() => handlePagiantion(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Table;
