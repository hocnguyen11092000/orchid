import { Box, Grid, Pagination, Paper, Stack, Typography } from "@mui/material";
import productApi from "api/productApi";
import { setFilter } from "features/address/addressSlice";
import Category from "features/user-page/components/filter/category/Category";
import Price, {
  PriceValue,
} from "features/user-page/components/filter/price/Price";
import SearchProduct, {
  SearchValue,
} from "features/user-page/components/filter/search/SearchProduct";
import ProductItem from "features/user-page/components/product-item/ProductItem";
import { ListResponse, Product } from "models";
import React, { useState } from "react";
import { useQuery } from "react-query";
import "./listproduct.scss";
type Props = {};

const ListProduct = (props: Props) => {
  const [page, setPage] = React.useState<number>(1);

  const [filter, setFilter] = useState<any>({
    page,
    keyword: "",
    cat: "",
    "price[lte]": undefined,
  });

  const handleChange = (event: any, value: any) => {
    setPage(value);
    setFilter({
      ...filter,
      page: value,
    });
  };
  const fetchProductList = async (filter: any) => {
    const res: ListResponse<Product> = await productApi.getAll(filter);
    return res;
  };

  const { isLoading, error, data } = useQuery<
    ListResponse<Product>,
    ErrorConstructor
  >(["fetchProducts", filter], () => fetchProductList(filter));

  // if (isLoading) return <div>loading...</div>;

  if (error) return <div>error</div>;

  let count = 0;

  if (data?.productCount) {
    count = Math.ceil(data?.productCount / 8);
  }

  const handleSubmit = (value: SearchValue) => {
    setFilter({
      ...filter,
      keyword: value.keyword,
    });
  };

  const handleChangeCategory = (category: string) => {
    setFilter({
      ...filter,
      cat: category,
    });
  };

  const handleResetFilter = () => {
    setFilter({
      page: 1,
      keyword: "",
      cat: "",
      "price[lte]": undefined,
    });
  };

  const handlePriceChange = (value: PriceValue) => {
    setFilter({
      ...filter,
      "price[lte]": value,
    });
  };

  // console.log(filter);

  return (
    <div
      style={{
        backgroundColor: "rgb(240, 240, 240)",
        margin: "0",
        padding: "0",
      }}
      className="wrapper-product"
    >
      <Box className="list-product">
        <Grid container spacing={1}>
          <Grid item md={3} sm={12} xs={12}>
            <Paper elevation={0} sx={{ padding: "20px" }}>
              <div onClick={handleResetFilter} className="reset">
                All product
              </div>
              <SearchProduct onSubmit={handleSubmit}></SearchProduct>
              <Typography variant="h5" component="h2">
                Category
              </Typography>
              <Category onChange={handleChangeCategory}></Category>
              <Typography variant="h5" component="h2">
                Price
              </Typography>
              <Price onSubmit={handlePriceChange}></Price>
            </Paper>
          </Grid>
          <Grid item md={9} sm={12} xs={12}>
            <Paper elevation={0} sx={{ padding: "20px" }}>
              <Grid container>
                {isLoading && "Loading..."}
                {data &&
                  data.products.map((item: Product, index: number) => {
                    return (
                      <Grid item xs={12} sm={12} md={3} key={index}>
                        <ProductItem item={item}></ProductItem>
                      </Grid>
                    );
                  })}
              </Grid>
              <div className="pagination" style={{ marginTop: "0" }}>
                <Stack spacing={2}>
                  <Pagination
                    count={count}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                  />
                </Stack>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ListProduct;
