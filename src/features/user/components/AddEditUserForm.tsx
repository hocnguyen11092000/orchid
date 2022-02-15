import { CircularProgress } from "@mui/material";
import { useAppSelector } from "app/hooks";
import { InputField } from "components/form-controls/InputFields";
import { User } from "models";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type Props = {
  onSubmit?: (values: User) => void;
  init?: any;
};

const AddEditUserForm = (props: Props) => {
  const loading = useAppSelector((state) => state.user.loading);
  const [avatar, setAvatar] = useState<any>();
  const [avatarPreview, setAvatarPreview] = useState<any>();
  const { onSubmit, init } = props;
  const { id } = useParams();

  // useEffect(() => {
  //   function getBase64Image(img: any) {
  //     var canvas = document.createElement("canvas");
  //     canvas.width = img.width;
  //     canvas.height = img.height;
  //     var ctx: any = canvas.getContext("2d");
  //     ctx.drawImage(img, 0, 0);
  //     var dataURL = canvas.toDataURL("image/png");
  //     dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  //     // console.log(dataURL);

  //     return "data:image/png;base64," + dataURL;
  //   }

  //   var base64 = getBase64Image(document.getElementById("imageid"));
  //   console.log(base64);
  // }, [id]);

  // console.log(avatar);

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm({
    defaultValues: init,
  });

  const handleImageChange = (e: any) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (values: User) => {
    values.avatar = avatar;

    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="add-edit-user__form-group">
        <label htmlFor="name">Name:</label>
        <InputField
          control={control}
          id="name"
          name="name"
          placeholder="Nhập tên..."
        ></InputField>
      </div>
      <div className="add-edit-user__form-group">
        <label htmlFor="email">Email:</label>
        <InputField
          control={control}
          id="email"
          name="email"
          placeholder="Nhập email..."
        ></InputField>
      </div>
      {!id && (
        <>
          <div className="add-edit-user__form-group">
            <label htmlFor="password">Password:</label>
            <InputField
              control={control}
              id="password"
              name="password"
              placeholder="Nhập password..."
            ></InputField>
          </div>
          <div className="add-edit-user__form-group">
            <label htmlFor="confirmPassword">Comfirm password:</label>
            <InputField
              control={control}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Nhập confirmPassword..."
            ></InputField>
          </div>
        </>
      )}
      <div className="add-edit-user__form-group">
        <label htmlFor="avatar">Avatar:</label>
        <input
          name="avatar"
          type="file"
          multiple
          id="avatar"
          onChange={handleImageChange}
        />
      </div>
      <div className="avatar">
        {init && (
          <img
            crossOrigin="anonymous"
            id="imageid"
            src={init?.avatar?.url}
            alt=""
            width={100}
          />
        )}
      </div>
      <div className="add-edit-user__form-group">
        <button type="submit">
          {loading ? (
            <CircularProgress
              size={16}
              sx={{ color: "#fff" }}
            ></CircularProgress>
          ) : id ? (
            "Edit user"
          ) : (
            "Add User"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddEditUserForm;
