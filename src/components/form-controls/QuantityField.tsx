import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import * as React from "react";
import { InputHTMLAttributes } from "react";
import { Control, Controller, useController } from "react-hook-form";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  handleChange?: (value: any) => void;
  setValue?: any;
}

export function QuantityField({
  name,
  control,
  label,
  type,
  placeholder,
  handleChange,
  setValue,
}: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <>
          <IconButton
            onClick={() =>
              setValue(
                name,
                Number.parseInt(value) ? Number.parseInt(value) - 1 : 1
              )
            }
          >
            <RemoveCircleOutline></RemoveCircleOutline>
          </IconButton>
          <input
            className="quantity-input"
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            type={type}
          />
          <IconButton
            onClick={() =>
              setValue(
                name,
                Number.parseInt(value) ? Number.parseInt(value) + 1 : 1
              )
            }
          >
            <AddCircleOutline></AddCircleOutline>
          </IconButton>
        </>
      )}
    ></Controller>
  );
}
