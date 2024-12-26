"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../globals.css";

export default function Register() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên đăng nhập"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số"
        )
        .required("Vui lòng nhập mật khẩu"),
      repassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
        .required("Vui lòng nhập lại mật khẩu"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            repassword: values.repassword,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 400 && errorData.message === "Email đã tồn tại") {
            setFieldError("email", "Email đã tồn tại");
            setErrorMessage("Email đã tồn tại");
          } else {
            throw new Error(errorData.message || "Đăng ký thất bại");
          }
        } else {
          // Xử lý thành công
          setSuccessMessage("Đăng ký thành công");
          setErrorMessage(""); // Xóa lỗi 
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container-signup">
      <div className="content-signup">
        <div id="content-book"></div>
        <div id="content-right">
          <div className="content-right-contents">
            <h2>Đăng ký</h2>
            <form
              onSubmit={formik.handleSubmit}
              id="signupForm"
              className="login-form"
            >
              {" "}
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
              <input
                className="email-inp"
                name="name"
                id="name"
                type="text"
                placeholder="Tên đăng nhập"
                {...formik.getFieldProps("name")}
              />
              <br />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
              <input
                className="email-inp"
                name="email"
                id="email"
                type="text"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              <br />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
              <input
                className="pass-inp"
                name="password"
                id="pass"
                type="password"
                placeholder="Mật khẩu"
                {...formik.getFieldProps("password")}
              />
              <br />
              {formik.touched.repassword && formik.errors.repassword ? (
                <div className="text-danger">{formik.errors.repassword}</div>
              ) : null}
              <input
                className="pass-inp"
                name="repassword"
                id="repassword"
                type="password"
                placeholder="Nhập lại mật khẩu"
                {...formik.getFieldProps("repassword")}
              />
              <br />
              {successMessage && (
                <div className="text-success">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="text-danger">{errorMessage}</div>
              )}
              <p id="link-signup">
                Bạn đã có tài khoản? <br />
                <a href="/dangnhap">Đăng nhập ngay</a>
              </p>
              <input
                style={{ margin: "0 auto", marginTop: "20px" }}
                type="submit"
                className="btn"
                value="Đăng ký"
                disabled={formik.isSubmitting}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
