import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import { CircularProgress } from "@mui/material";
import { InputField } from "components/form-controls/InputFields";
import "draft-js/dist/Draft.css";
import { Product } from "models";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
type Props = {
  onSubmit?: (values: FormData) => void;
  init?: any;
};

const AddEditForm = (props: Props) => {
  const { onSubmit, init } = props;
  const [images, setImages] = useState<any>([]);
  const [imagesPreview, setImagesPreview] = useState<any>([]);
  const [dataCkediter, setDataCkediter] = useState<any>();
  const { id } = useParams();
  const initialValues: any = {
    name: "",
    description: "",
    price: 0,
    discount: 0,
    weight: 0,
    category: "",
    stock: 0,
  } as Product;
  console.log(init);

  const values = Boolean(id) ? init : initialValues;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: values,
  });

  useEffect(() => {
    if (!id && images.length === 0) {
      setValue("name", "");
      setValue("description", "");
      setValue("category", "");
      setValue("price", 0);
      setValue("discount", 0);
      setValue("weight", 0);
      setValue("stock", 0);
      setImagesPreview([]);
      setImages([]);
    }
    if (init) {
      setDataCkediter(init.description);
    }
  }, [id]);

  const [product, setProduct] = useState<any>();

  const createProductImagesChange = (e: any) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file: any) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old: any) => [...old, reader.result]);
          setImages((old: any) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFormSubmit = async (values: any) => {
    values.images = images;
    values.description = dataCkediter;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div className="add-edit__form">
      <h3 className="add-edit__form-heading">
        {Boolean(id) ? "Edit product" : "Add product"}
      </h3>
      <div className="add-edit__form-content">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="add-edit__form-form-group">
            <label htmlFor="name">Name</label>
            <InputField
              id="name"
              name="name"
              control={control}
              placeholder="Nhập tên..."
            ></InputField>
          </div>
          <div className="add-edit__form-form-group">
            <label htmlFor="description">description</label>
            <CKEditor
              editor={ClassicEditor}
              data={(init && init?.description) || ""}
              onInit={(editor: any) => {
                // You can store the "editor" and use when it is needed.
                // if (init) setDataCkediter(init.description);
              }}
              onChange={(event: any, editor: any) => {
                const data = editor.getData();
                setDataCkediter(data);
              }}
              // onBlur={(event: any, editor: any) => {
              //   console.log("Blur.", editor);
              // }}
              // onFocus={(event: any, editor: any) => {
              //   console.log("Focus.", editor);
              // }}
            />
            {/* <InputField
              name="description"
              control={control}
              id="description"
              placeholder="Nhập description..."
            ></InputField> */}
          </div>
          <div className="add-edit__form-form-group">
            <label htmlFor="price">price</label>
            <InputField
              name="price"
              control={control}
              id="price"
              placeholder="Nhập price..."
            ></InputField>
          </div>
          <div className="add-edit__form-form-group">
            <label htmlFor="discount">discount</label>
            <InputField
              name="discount"
              control={control}
              id="discount"
              placeholder="Nhập discount..."
            ></InputField>
          </div>
          <div className="add-edit__form-form-group">
            <label htmlFor="weight">weight</label>
            <InputField
              name="weight"
              control={control}
              id="weight"
              placeholder="Nhập weight..."
            ></InputField>
          </div>
          <div className="add-edit__form-form-group">
            <label htmlFor="category">category</label>
            <InputField
              name="category"
              control={control}
              id="category"
              placeholder="Nhập category..."
            ></InputField>
          </div>
          <div className="add-edit__form-form-group">
            <label htmlFor="stock">stock</label>
            <InputField
              name="stock"
              control={control}
              id="stock"
              placeholder="Nhập stock..."
            ></InputField>
          </div>
          <div className="add-edit__form-form-group">
            <label htmlFor="images">Images</label>
            <input
              type="file"
              onChange={createProductImagesChange}
              name="images"
              multiple
            />
          </div>

          <div className="add-edit__form-form-group">
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <CircularProgress
                  size={16}
                  sx={{ color: "#fff" }}
                ></CircularProgress>
              ) : Boolean(id) ? (
                "Edit product"
              ) : (
                "Add product"
              )}
            </button>
          </div>
        </form>
        <div>
          {id &&
            init.images?.map((item: any, index: number) => (
              <img key={index} src={item.url} alt="Product Preview" />
            ))}
          {imagesPreview &&
            imagesPreview.map((item: any, index: number) => (
              <img key={index} src={item} alt="Product Preview" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddEditForm;
