import { unwrapResult } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import AddEditUserForm from "features/user/components/AddEditUserForm";
import { addUser, updateUser } from "features/user/userSlice";
import { User } from "models";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./addedituser.scss";

type Props = {};

const AddEditUser = (props: Props) => {
  const [user, setUser] = useState<any>();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await userApi.getMe();
        setUser(data.user);
      } catch (error) {
        console.log("Failed to fetch student details", error);
      }
    })();
  }, [id]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const inittalValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    ...user,
  };

  const handleSubmit = async (values: any) => {
    const myForm = new FormData();

    myForm.append("name", values.name);
    myForm.append("email", values.email);
    myForm.append("password", values.password);

    myForm.append("avatar", values.avatar);

    if (!isEdit) {
      try {
        const result: any = await dispatch(addUser(myForm));
        unwrapResult(result);

        toast.success("Add user successfully");
        navigate("/userList");
      } catch (error) {
        console.log(error);
        toast.error("Add user error");
      }
    } else {
      if (id) {
        try {
          myForm.delete("password");
          // await userApi.update(myForm);
          const result = await dispatch(updateUser(myForm));
          unwrapResult(result);
          navigate("/");
          toast.success("Update successfully");
        } catch (error) {
          toast.error("Update Fail");
        }
      }
    }
  };
  return (
    <div className="add-edit-user">
      <h2 className="add-edit-user__heading">
        {isEdit ? "Edit user" : "Add user"}
      </h2>
      {(!isEdit || Boolean(user)) && (
        <AddEditUserForm
          onSubmit={handleSubmit}
          init={inittalValues}
        ></AddEditUserForm>
      )}
    </div>
  );
};

export default AddEditUser;
