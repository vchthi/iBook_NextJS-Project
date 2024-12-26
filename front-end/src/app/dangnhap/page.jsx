// pages/login.js
"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../globals.css";
import { useRouter } from "next/navigation";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên đăng nhập"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Đăng nhập thất bại');
        }

        const data = await res.json();
        if (!data.access_token) {
          throw new Error('Không nhận được token');
        }

        document.cookie = `token=${data.access_token}; path=/; max-age=${60 * 60}`;
        
        if (data.role === 1) {
          router.push('http://localhost:3002');
        } else {
          router.push('/info');
        }
      } catch (error) {
        setFieldError('general', error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container-login">
      <div className="content-login">
        <div id="content-book"></div>
        <div id="content-right">
          <div className="content-right-contents">
            <h2 style={{ marginBottom: "30px", marginTop: "70px" }}>Đăng nhập</h2>
            <form onSubmit={formik.handleSubmit} id="loginForm" className="login-form">
              <input
                className="name-inp"
                name="name"
                id="name"
                type="text"
                placeholder="Tên đăng nhập"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
              <br />
              <input
                className="pass-inp"
                name="password"
                id="pass"
                type="password"
                placeholder="Mật khẩu"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
              <br />
              {formik.errors.general && (
                <p className="text-danger">{formik.errors.general}</p>
              )}
               <p id="link-signup">
                Bạn chưa có tài khoản? <br />
                <a href="/dangky">Đăng ký ngay</a>
              </p>
              <input
                style={{ margin: "0 auto", marginTop: "20px" }}
                type="submit"
                className="btn-login"
                value="Đăng nhập"
                disabled={formik.isSubmitting}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
