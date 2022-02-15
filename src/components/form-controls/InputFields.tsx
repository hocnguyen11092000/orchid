import * as React from "react";
import { InputHTMLAttributes } from "react";
import { Control, Controller, useController } from "react-hook-form";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  handleChange?: (value: any) => void;
}

export function InputField({
  name,
  control,
  label,
  type,
  placeholder,
  handleChange,
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
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          placeholder={placeholder}
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
