"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../globals.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
  price_1: Yup.number()
    .required("Vui lòng nhập giá cũ")
    .positive("Hãy nhập số"),
  price_2: Yup.number()
    .required("Vui lòng nhập giá mới")
    .positive("Hãy nhập số"),
  mota_1: Yup.string().required("Vui lòng nhập mô tả"),
  mota_2: Yup.string().required("Vui lòng nhập thông tin"),
  category: Yup.string().required("Vui lòng chọn danh mục"),
  image: Yup.mixed().required("Hãy chọn hình ảnh"),
});

export default function ProductAdd() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/categories");
        if (!res.ok) {
          throw new Error("không lấy được cate");
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getCategories();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("price_1", values.price_1);
    data.append("price_2", values.price_2);
    data.append("mota_1", values.mota_1);
    data.append("mota_2", values.mota_2);
    data.append("category", values.category);
    data.append("image", values.image);

    try {
      const res = await fetch("http://localhost:3000/products/", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.error) {
        setError(result.error);
      } else {
        setMessage(result.message);
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <div className="nav-add-header">
        <h2
          className="title-add-admin"
          style={{
            fontFamily: "Playfair Display",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          Thêm sản phẩm
        </h2>
        <br />
        <Formik
          initialValues={{
            name: "",
            price_1: "",
            price_2: "",
            mota_1: "",
            mota_2: "",
            category: "",
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form id="formThemSanPham" encType="multipart/form-data">
              <label htmlFor="name" id="lable-admin">
                Tên sản phẩm
              </label>
              <Field
                style={{ padding: "13px", width: "100%" }}
                name="name"
                type="text"
                className="form-control"
                placeholder="Nhập tên sản phẩm"
              />
              <ErrorMessage
                name="name"
                component="small"
                className="text-danger"
              />
              <br />
              <br />
              <label htmlFor="price_1" id="lable-admin">
                Giá sản phẩm cũ
              </label>
              <Field
                style={{ padding: "13px", width: "100%" }}
                name="price_1"
                type="number"
                className="form-control"
                placeholder="Nhập giá cũ sản phẩm"
              />
              <ErrorMessage
                name="price_1"
                component="small"
                className="text-danger"
              />
              <br />
              <br />
              <label htmlFor="price_2" id="lable-admin">
                Giá sản phẩm mới
              </label>
              <Field
                style={{ padding: "13px", width: "100%" }}
                name="price_2"
                type="number"
                className="form-control"
                placeholder="Nhập giá mới sản phẩm"
              />
              <ErrorMessage
                name="price_2"
                component="small"
                className="text-danger"
              />
              <br />
              <br />
              <label htmlFor="image" id="lable-admin">
                Hình ảnh
              </label>
              <br />
              {/* <input
                      name="image"
                      type="file"
                      className="form-control"
                      onChange={(event) => {
                        setFieldValue('image', event.currentTarget.files[0]);
                      }}
                    />    <br /> */}
              <input
                name="image"
                type="file"
                className="form-control"
                onChange={(event) => handleImageChange(event, setFieldValue)}
              />
              <br />
              <br />
              <ErrorMessage
                name="image"
                component="small"
                className="text-danger"
              />
              {previewImage && (
                <>
                  <img src={previewImage} alt="" style={{ width: "70px" }} />
                  <br />
                </>
              )}
              <br />
              <br />
              <label
                htmlFor="category"
                style={{ marginRight: "10px" }}
                id="lable-admin"
              >
                Danh mục
              </label>
              <Field as="select" name="category" className="form-control">
                <option value="">Chọn danh mục</option>
                <br />
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Field>
              <br />
              <ErrorMessage
                name="category"
                component="small"
                className="text-danger"
              />
              <br />
              <br />
              <label htmlFor="mota_1" id="lable-admin">
                Mô tả
              </label>
              <Field
                as="textarea"
                name="mota_1"
                className="form-control"
                placeholder="Nhập mô tả sản phẩm"
              />
              <ErrorMessage
                name="mota_1"
                component="small"
                className="text-danger"
              />
              <br />
              <br />
              <label htmlFor="mota_2" id="lable-admin">
                Thông tin sách
              </label>
              <Field
                as="textarea"
                name="mota_2"
                className="form-control"
                placeholder="Nhập thông tin sản phẩm"
              />
              <ErrorMessage
                name="mota_2"
                component="small"
                className="text-danger"
              />
              <br />
              <br />
              <button
                style={{ float: "left" }}
                className="add-button"
                type="submit"
                disabled={isSubmitting}
              >
                Thêm
              </button>
              <Link href="/adminsanpham">
                <button
                  style={{ float: "right" }}
                  className="close-button"
                  type="button"
                >
                  Đóng
                </button>
              </Link>
            </Form>
          )}
        </Formik>
        {message && <div className="text-danger">{message}</div>}
        {error && <div className="text-danger">{error}</div>}
      </div>
    </>
  );
}
