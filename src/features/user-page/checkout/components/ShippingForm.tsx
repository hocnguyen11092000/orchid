import { InputField } from "components/form-controls/InputFields";

import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { useAppSelector } from "app/hooks";
import userApi from "api/userApi";
import { toast } from "react-toastify";

type Props = {
  onSubmit: (values: any) => void;
};

const ShippingForm = (props: Props) => {
  const { onSubmit } = props;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      phoneNo: "",
      gender: "",
    },
  });

  const handleFormSubmit = async (values: any) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <>
      <div className="shipping-form">
        <div className="form">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-group" style={{ margin: "15px 0" }}>
              <label
                style={{ minWidth: "150px", display: "inline-block" }}
                htmlFor="name"
              >
                Name:
              </label>
              <InputField
                mWidth="350px"
                id="name"
                name="name"
                control={control}
                placeholder="Nhập name..."
              ></InputField>
            </div>
            <div className="form-group" style={{ margin: "15px 0" }}>
              <label
                style={{ minWidth: "150px", display: "inline-block" }}
                htmlFor="address"
              >
                Address:
              </label>
              <InputField
                mWidth="350px"
                id="address"
                name="address"
                control={control}
                placeholder="Nhập address..."
              ></InputField>
            </div>
            <div className="form-group" style={{ margin: "15px 0" }}>
              <label
                style={{ minWidth: "150px", display: "inline-block" }}
                htmlFor="phoneNo"
              >
                Phone number:
              </label>
              <InputField
                mWidth="350px"
                id="phoneNo"
                name="phoneNo"
                control={control}
                placeholder="Nhập phoneNo..."
              ></InputField>
            </div>
            <div className="form-group" style={{ margin: "15px 0" }}>
              <label
                style={{ minWidth: "150px", display: "inline-block" }}
                htmlFor="gender"
              >
                Gender:
              </label>
              <InputField
                mWidth="350px"
                id="gender"
                name="gender"
                control={control}
                placeholder="Nhập gender..."
              ></InputField>
            </div>
            <div className="check-out-btn">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <CircularProgress size={16}></CircularProgress>
                ) : (
                  "Thanh toán"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingForm;
