import { useAppDispatch, useAppSelector } from "app/hooks";
import Table from "components/Common/table/Table";
import TableSkelaton from "components/Common/tableSkelaton/TableSkelaton";
import { Product } from "models";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { productActions } from "../productSlice";
import "./listproduct.scss";
import queryString from "query-string";

type Props = {};

const ListProduct = (props: Props) => {
  // const location = useLocation();

  // const queryParams = useMemo(() => {
  //   const params = queryString.parse(location.search);

  //   return {
  //     ...params,
  //     page: (params.page && Number(params.page)) || 1,
  //   };
  // }, [location.search]);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      keyword: "",
    },
  });
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.product.filter);
  const loading = useAppSelector((state) => state.product.loading);
  const productCount = useAppSelector((state) => state.product.productCount);

  useEffect(() => {
    dispatch(productActions.fetchProductList(filter));
  }, [dispatch, filter]);

  const data: Product[] = useAppSelector((state) => state.product.list);
  const head = [
    "ID",
    "name",
    "price",
    "image",
    "weight",
    "category",
    "stock",
    "action",
  ];
  const handlePagination = (index: number) => {
    // const filters = {
    //   ...queryParams,
    //   page: index,
    // };

    dispatch(
      productActions.setFilter({
        ...filter,
        page: index,
      })
    );

    // navigate({
    //   pathname: location.pathname,
    //   search: queryString.stringify(filters),
    // });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      productActions.setFilter({
        ...filter,
        keyword: e.target.value,
      })
    );
  };

  const handleEditProduct = (id: string) => {
    navigate(`/add-edit-product/${id}`);
  };

  const handleDeleteProduct = async (id: string) => {
    await dispatch(productActions.deleteProduct(id));
  };

  return (
    <div className="product-list">
      {/* {loading && <div className="loading">Loading...</div>} */}
      <div className="product-list__heading">
        <h2 className="product-list__heading-title">List Product</h2>
        <div className="product-list__heading-search">
          <form className="product-list__heading-search-form">
            <div className="product-list__heading-search-form-form-group">
              <input
                type="text"
                placeholder="seach..."
                onChange={handleFormChange}
              />
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="loading">
        {loading && <LinearProgress sx={{ margin: "10px 0" }}></LinearProgress>}
      </div> */}
      <div className="product-list__table">
        <Table
          head={head}
          data={data}
          count={productCount}
          pagination={handlePagination}
          filter={filter}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          loading={loading}
        ></Table>
      </div>
    </div>
  );
};

export default ListProduct;
