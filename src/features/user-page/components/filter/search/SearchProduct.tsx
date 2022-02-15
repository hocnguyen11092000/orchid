import { CircularProgress } from "@mui/material";
import { InputField } from "components/form-controls/InputFields";
import React from "react";
import { useForm } from "react-hook-form";
import "./search.scss";

type Props = {
  onSubmit?: (value: SearchValue) => void;
};

export interface SearchValue {
  keyword: string;
}

const searchDefault: SearchValue = {
  keyword: "",
};

const SearchProduct = (props: Props) => {
  const { onSubmit } = props;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      keyword: "",
    },
  });

  const handleFormSubmit = (value: SearchValue) => {
    if (onSubmit) {
      onSubmit(value);
    }
  };
  return (
    <div className="search-product">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField
          control={control}
          name="keyword"
          placeholder="Search..."
        ></InputField>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <CircularProgress size={16}></CircularProgress>
          ) : (
            "Search"
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchProduct;
