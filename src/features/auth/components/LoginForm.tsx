import { InputField } from "components/form-controls/InputFields";
import { Values } from "models";
import React, { useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { selectLoging } from "../authSlice";
import { useAppSelector } from "app/hooks";
import userApi from "api/userApi";
import { toast } from "react-toastify";

type Props = {
  onSubmit: (values: Values) => void;
};

const handleShowForgotPassword = (toggleRef: any, contentRef: any) => {
  document.addEventListener("mousedown", (e: any) => {
    if (toggleRef?.current && toggleRef.current.contains(e.target)) {
      contentRef.current.classList.toggle("active");
    } else {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        contentRef.current.classList.remove("active");
      }
    }
  });
};

const LoginForm = (props: Props) => {
  const [emailForgot, setEmailForgot] = useState<string>("");
  const isLoading = useAppSelector((state) => state.auth.logging);
  const [loadingForgot, setLoadingForgot] = useState<boolean>(false);
  const { onSubmit } = props;
  const toggleRef = useRef<any>(null);
  const contentRef = useRef<any>(null);

  handleShowForgotPassword(toggleRef, contentRef);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (values: Values) => {
    if (onSubmit) {
      await onSubmit(values);
      await setValue("email", "");
      await setValue("password", "");
    }
  };

  const handleForgotPassword = async () => {
    setLoadingForgot(true);
    try {
      await userApi.forgotPassword(emailForgot);
      setLoadingForgot(false);
      toast.success("Successfully, please check your email");

      if (contentRef.current) {
        contentRef.current.classList.remove("active");
      }
    } catch (error) {
      setLoadingForgot(false);
      toast.error("Fail");
    }
  };

  return (
    <>
      <div className="login-form">
        <div className="login-form__title">
          <h3>Đăng nhập</h3>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <InputField
                id="email"
                name="email"
                control={control}
                placeholder="Nhập email..."
              ></InputField>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <InputField
                id="password"
                name="password"
                control={control}
                placeholder="Nhập password"
              ></InputField>
            </div>
            <div className="form-group">
              <span className="forgot" ref={toggleRef}>
                Forgot your password ?
              </span>
            </div>
            <div className="form-group">
              <button disabled={isLoading} type="submit">
                {(isLoading && (
                  <CircularProgress size={16} sx={{ color: "#fff" }} />
                )) ||
                  "Đăng nhập"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="forgot-form" ref={contentRef}>
        <div className="forgot__form">
          <input
            type="text"
            placeholder="Nhập email..."
            onChange={(e) => setEmailForgot(e.target.value)}
          />
          <div>
            <button
              type="submit"
              onClick={handleForgotPassword}
              disabled={loadingForgot}
            >
              {(loadingForgot && (
                <CircularProgress size={16} sx={{ color: "#fff" }} />
              )) ||
                "Thực hiện"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
