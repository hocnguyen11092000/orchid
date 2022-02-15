import productApi from "api/productApi";
import { ListResponse } from "models";
import React from "react";
import { useQuery } from "react-query";

type Props = {
  onChange?: (value: string) => void;
};

const Category = (props: Props) => {
  const { onChange } = props;
  const fetchCategory = async () => {
    const res: any = await productApi.getAddCat();
    return res;
  };
  const { isLoading, error, data } = useQuery<
    ListResponse<any>,
    ErrorConstructor
  >("fetchProducts", fetchCategory);

  if (isLoading) return <div>loading...</div>;

  if (error) return <div>error</div>;

  const handleChangeCategory = (item: string) => {
    if (onChange) {
      onChange(item);
    }
  };

  return (
    <ul className="category-list">
      {data?.category?.map((item, index) => {
        return (
          <li key={index} onClick={() => handleChangeCategory(item)}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default Category;
