"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import "../globals.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
const validationSchema = Yup.object({
  name: Yup.string().required("Tên danh mục là bắt buộc"),
  description: Yup.string().required("Mô tả là bắt buộc"),
});

export default function CategoryAdd() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    // const data = new FormData();
    // data.append("name", values.name);
    // data.append("description", values.description);

    const data = {
      name: values.name,
      description: values.description
    }

    try {
      const res = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);
      if (result.error) {
        setError(result.error);
      } else {
        setMessage(result.message);
        router.push("/danhmuc");
      }
    } catch (err) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="nav-add-header">
        <h2
          className="title-add-admin"
          style={{
            fontFamily: "Playfair Display",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          Thêm danh mục
        </h2>
        <br />
        <div id="addProductModal">
          <Formik
            initialValues={{ name: "", description: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id="formThemSanPham" encType="multipart/form-data">
                <label htmlFor="name">Tên danh mục</label>
                <br />
                <Field
                  style={{ padding: "13px", width: "100%" }}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên danh mục"
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
                <br />
                <label htmlFor="description">Mô tả</label>
                <br />
                <Field
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Nhập mô tả danh mục"
                  style={{ padding: "13px", width: "100%" }}
                />
                <ErrorMessage name="description" component="div" className="text-danger" />
                <br />
                <button
                  style={{ float: "left" }}
                  className="add-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Thêm
                </button>
                <Link href="/danhmuc">
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
        </div>
      </div>
    </div>
  );
}
