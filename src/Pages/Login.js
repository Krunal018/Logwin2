import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../Redux/authSlice"; // Adjust the import path
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        "Password must include at least one symbol"
      )
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const user = { email: values.email, password: values.password };
      const minLoadingTime = new Promise((resolve) =>
        setTimeout(resolve, 5000)
      ); // 5 seconds delay
      try {
        await Promise.all([dispatch(login(user)), minLoadingTime]);
        navigate("/home");
      } catch (error) {
        // Handle login error if needed
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#333" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{
          width: "300px",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          backgroundColor: darkMode ? "#444" : "#fff",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: darkMode ? "#666" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: darkMode ? "#666" : "#fff",
                color: darkMode ? "#fff" : "#000",
              }}
            />
            {showPassword ? (
              <AiFillEyeInvisible
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: darkMode ? "#fff" : "#000",
                }}
              />
            ) : (
              <AiFillEye
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: darkMode ? "#fff" : "#000",
                }}
              />
            )}
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={!formik.isValid || !formik.dirty || loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor:
              !formik.isValid || !formik.dirty || loading
                ? "#888"
                : darkMode
                ? "#555"
                : "#007BFF",
            color: "#fff",
            cursor:
              !formik.isValid || !formik.dirty || loading
                ? "not-allowed"
                : "pointer",
            position: "relative",
          }}
        >
          {loading ? (
            <div
              style={{
                width: "20px",
                height: "20px",
                border: "2px solid #f3f3f3",
                borderTop: "2px solid #3498db",
                borderRadius: "50%",
                animation: "spin 2s linear infinite",
                margin: "0 auto",
              }}
            ></div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
