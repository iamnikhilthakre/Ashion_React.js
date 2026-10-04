import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  clearError
} from "../redux/authSlice";
import { toast } from 'react-toastify';

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated, registrationSuccess } = useSelector(
    (state) => state.auth
  );

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(loginData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(loginStart());

    setTimeout(() => {
      dispatch(loginSuccess({
        email: loginData.email,
        name: loginData.email.split("@")[0],
        isVerified: true
      }));
      toast.success("Successfully logged in!");
      navigate(from, { replace: true });
    }, 500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!registerData.name) {
      newErrors.name = "Full name is required";
    } else if (registerData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!registerData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(registerData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!registerData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(registerData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(registerStart());

    setTimeout(() => {
      dispatch(registerSuccess());
      dispatch(loginSuccess({
        email: registerData.email,
        name: registerData.name,
        isVerified: true
      }));
      toast.success("Account created successfully!");
      navigate(from, { replace: true });
    }, 500);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f6f3",
      padding: "40px"
    },
    card: {
      width: "100%",
      maxWidth: "1200px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      backgroundColor: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    },
    left: {
      backgroundColor: "#f1dfd7",
      padding: "60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    right: {
      padding: "60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    input: {
      width: "100%",
      padding: "14px",
      marginTop: "8px",
      marginBottom: "6px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      fontSize: "14px"
    },
    inputError: {
      borderColor: "#dc3545"
    },
    errorText: {
      color: "#dc3545",
      fontSize: "12px",
      marginBottom: "16px",
      marginTop: "0"
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontSize: "18px",
      cursor: "pointer",
      marginTop: "10px"
    },
    buttonDisabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed"
    },
    link: {
      color: "red",
      cursor: "pointer",
      fontWeight: "bold"
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#333",
      marginBottom: "4px"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.left}>
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Ashion</h1>
          <h2 style={{ fontSize: "42px", marginBottom: "20px" }}>
            {showRegister ? "Join Us" : "Welcome Back"}
          </h2>
          <p style={{ fontSize: "20px", color: "#555" }}>
            {showRegister
              ? "Create an account to enjoy personalized shopping and exclusive offers."
              : "Login to continue shopping the latest fashion trends."}
          </p>
        </div>

        <div style={styles.right}>
          <h2 className="mb-4">{showRegister ? "Create Account" : "Login"}</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {showRegister ? (
            <>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label style={styles.label}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    style={{
                      ...styles.input,
                      ...(errors.name ? styles.inputError : {})
                    }}
                  />
                  {errors.name && (
                    <p style={styles.errorText}>{errors.name}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    style={{
                      ...styles.input,
                      ...(errors.email ? styles.inputError : {})
                    }}
                  />
                  {errors.email && (
                    <p style={styles.errorText}>{errors.email}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    style={{
                      ...styles.input,
                      ...(errors.password ? styles.inputError : {})
                    }}
                  />
                  {errors.password && (
                    <p style={styles.errorText}>{errors.password}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label style={styles.label}>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    style={{
                      ...styles.input,
                      ...(errors.confirmPassword ? styles.inputError : {})
                    }}
                  />
                  {errors.confirmPassword && (
                    <p style={styles.errorText}>{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.button,
                    ...(isLoading ? styles.buttonDisabled : {})
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Register"}
                </button>

                <p style={{ marginTop: "20px", textAlign: "center" }}>
                  Already have an account?{" "}
                  <span style={styles.link} onClick={() => {
                    setShowRegister(false);
                    setErrors({});
                    dispatch(clearError());
                  }}>
                    Login
                  </span>
                </p>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    style={{
                      ...styles.input,
                      ...(errors.email ? styles.inputError : {})
                    }}
                  />
                  {errors.email && (
                    <p style={styles.errorText}>{errors.email}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    style={{
                      ...styles.input,
                      ...(errors.password ? styles.inputError : {})
                    }}
                  />
                  {errors.password && (
                    <p style={styles.errorText}>{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.button,
                    ...(isLoading ? styles.buttonDisabled : {})
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>

                <p style={{ marginTop: "20px", textAlign: "center" }}>
                  Don't have an account?{" "}
                  <span style={styles.link} onClick={() => {
                    setShowRegister(true);
                    setErrors({});
                    dispatch(clearError());
                  }}>
                    Register
                  </span>
                </p>

                <div className="mt-4 p-3 bg-light rounded-3 text-center">
                  <p className="small text-muted mb-2"><strong>Guest Access Available</strong></p>
                  <p className="small text-muted mb-0">You can browse and add to cart without logging in!</p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
