import React from "react";

export interface PriceValue {
  price: number;
}
type Props = {
  onSubmit?: (price: PriceValue) => void;
};

const Price = (props: Props) => {
  const { onSubmit } = props;

  const handlePriceChange = (e: any) => {
    if (onSubmit) {
      onSubmit(e.target.value);
    }
  };

  return (
    <div className="price-range">
      <span>0</span>
      <input
        type="range"
        name="price"
        min="0"
        max="100"
        onChange={handlePriceChange}
      />
      <span>100</span>
    </div>
  );
};

export default Price;
