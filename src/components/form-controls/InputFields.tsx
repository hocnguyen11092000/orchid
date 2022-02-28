import * as React from "react";
import { InputHTMLAttributes } from "react";
import { Control, Controller, useController } from "react-hook-form";
import "./inputfield.scss";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  handleChange?: (value: any) => void;
  mWidth?: any;
}

export function InputField({
  name,
  control,
  label,
  type,
  placeholder,
  handleChange,
  mWidth,
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
        <input
          className="input"
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          placeholder={placeholder}
          style={{ minWidth: mWidth }}
        />
      )}
    ></Controller>
    // <input
    //   value={value}
    //   onChange={onChange}
    //   onBlur={onBlur}
    //   type={type}
    //   placeholder={placeholder}
    // />
  );
}
