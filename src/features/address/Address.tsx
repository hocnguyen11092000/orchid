import { useAppDispatch, useAppSelector } from "app/hooks";
import Table from "components/Common/table/Table";
import React, { useEffect } from "react";
import { fetchAddress, setFilter } from "./addressSlice";
import "./address.scss";
import { Address, ListParams } from "models";

type Props = {};

const AddressPage = (props: Props) => {
  const filter: ListParams = useAppSelector((state) => state.address.filter);
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.address.addressCount);

  useEffect(() => {
    dispatch(fetchAddress(filter));
  }, [dispatch, filter]);

  const handlePagination = (page: number) => {
    dispatch(setFilter({ ...filter, page }));
  };
  const head = ["id", "user", "company", "address", "phoneNumber"];
  const address: Address[] = useAppSelector((state) => state.address.list);
  return (
    <div className="address">
      <h2 className="address__heading">List address</h2>
      <div className="table">
        <Table
          head={head}
          dataAddress={address}
          filter={filter}
          count={count}
          pagination={handlePagination}
        ></Table>
      </div>
    </div>
  );
};

export default AddressPage;
