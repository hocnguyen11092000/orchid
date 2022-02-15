import { Product } from "models";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./productitem.scss";
type Props = {
  item: Product;
};

const ProductItem = (props: Props) => {
  const { item } = props;
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    if (id) {
      navigate(`/user/product/${id}`);
    }
  };

  return (
    <div className="product-item" onClick={() => handleClick(item?._id)}>
      <img
        className="product-item__img"
        src={item.images[0].url}
        alt=""
        width="80%"
      />
      <p className="product-item__price">Giá: {item.price}.000đ</p>
      <p className="product-item__name">{item.name}</p>
    </div>
  );
};

export default ProductItem;
