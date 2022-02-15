import { useAppDispatch } from "app/hooks";
import { login } from "features/auth/authSlice";
import LoginForm from "features/auth/components/LoginForm";
import { Values } from "models";
import "./login.scss";

type Props = {};

const Login = (props: Props) => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (values: Values) => {
    await dispatch(login(values));
  };
  return (
    <div className="login">
      <LoginForm onSubmit={handleFormSubmit}></LoginForm>
    </div>
  );
};

export default Login;
