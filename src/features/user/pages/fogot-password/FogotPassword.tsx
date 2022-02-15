import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { InputField } from "components/form-controls/InputFields";
import { ForgotPaload, resetPassword } from "features/auth/authSlice";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./fogotpassword.scss";

type Props = {};
export interface ForgotValues {
  password: string;
  confirmPassword: string;
}

const FogotPassword = (props: Props) => {
  const loading = useAppSelector((state) => state.user.loading);
  const userAuth: any = useAppSelector((state) => state.auth.currentUser);
  const { token } = useParams();
  const naviage = useNavigate();

  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const HandleFormSubmit = async (values: ForgotValues) => {
    if (token) {
      const data: ForgotPaload = {
        values,
        token,
      };

      try {
        await dispatch(resetPassword(data));
      } catch (error) {
        toast.error("error");
      }
    }
  };
  return (
    <div className="forgot-password">
      <h2 className="forgot-password__heading">Reset Password</h2>
      <form action="" onSubmit={handleSubmit(HandleFormSubmit)}>
        <div className="forgot-password__form-group">
          <label htmlFor="password">Password: </label>
          <InputField
            control={control}
            name="password"
            placeholder="Nhập password..."
          ></InputField>
        </div>
        <div className="forgot-password__form-group">
          <label htmlFor="confirmPassword">CofimPassword: </label>
          <InputField
            control={control}
            name="confirmPassword"
            placeholder="Nhập confirmPassword..."
          ></InputField>
        </div>
        <div className="forgot-password__form-group">
          <button type="submit" disabled={loading}>
            {loading ? (
              <CircularProgress size={16}></CircularProgress>
            ) : (
              "Thực hiện"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FogotPassword;
