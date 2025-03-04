import React, { useState } from "react";
import API_BASE_URL from "../component/config";
import {
  ErrorNotification,
  SuccessNotification,
} from "../tosterNotification/tosters";

export default function Login() {
  const [formData, setFormData] = useState({
    email_id: "",
    password: "",
  });
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // ErrorNotification(data.message || "Login failed");
        throw new Error(data.message || "Login failed");
      }

      // Store admin ID in localStorage
      localStorage.setItem("adminId", data.data.admin_id);
      console.log(data.data.admin_id);

      // If remember device is checked, store the token
      if (rememberDevice) {
        localStorage.setItem("token", data.data.token);
      }

      // Redirect to dashboard or home page
      SuccessNotification("Login Successful");
      window.location.href = "/dashboard"; // Change this to your dashboard route
    } catch (err) {
      setError(err.message);
      ErrorNotification(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div id="main-wrapper" className="auth-customizer-none">
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 w-100">
          <div className="position-relative z-index-5">
            <div className="row">
              <div className="col-xl-7 col-xxl-8">
                <div className="d-none d-xl-flex align-items-center justify-content-center h-n80">
                  <img
                    src="../../assets/assets/images/backgrounds/login-security.svg"
                    alt="modernize-img"
                    className="img-fluid"
                    width={500}
                  />
                </div>
              </div>
              <div className="col-xl-5 col-xxl-4">
                <div className="authentication-login min-vh-100 bg-body row justify-content-center align-items-center p-4">
                  <div className="auth-max-width col-sm-8 col-md-6 col-xl-7 px-4">
                    <h2 className="mb-1 fs-7 fw-bolder">
                      Welcome to Clif Admin
                    </h2>
                    <p className="mb-7">Your Admin Dashboard</p>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                      {/* {error && (
                        <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded">
                          {error}
                        </div>
                      )} */}

                      <div className="mb-3">
                        <label htmlFor="email_id" className="form-label">
                          Username
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email_id"
                          name="email_id"
                          value={formData.email_id}
                          onChange={handleInputChange}
                          aria-describedby="emailHelp"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="form-check">
                          <input
                            className="form-check-input primary"
                            type="checkbox"
                            id="rememberDevice"
                            checked={rememberDevice}
                            onChange={(e) =>
                              setRememberDevice(e.target.checked)
                            }
                          />
                          <label
                            className="form-check-label text-dark fs-3"
                            htmlFor="rememberDevice"
                          >
                            Remember this Device
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-8 mb-4 rounded-2"
                        disabled={loading}
                      >
                        {loading ? "Signing In..." : "Sign In"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary p-3 rounded-circle d-flex align-items-center justify-content-center customizer-btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <i className="icon ti ti-settings fs-7" />
        </button>
        <div
          className="offcanvas customizer offcanvas-end"
          tabIndex={-1}
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <h4
              className="offcanvas-title fw-semibold"
              id="offcanvasExampleLabel"
            >
              Settings
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body h-n80" data-simplebar>
            <h6 className="fw-semibold fs-4 mb-2">Theme</h6>
            <div className="d-flex flex-row gap-3 customizer-box" role="group">
              <input
                type="radio"
                className="btn-check light-layout"
                name="theme-layout"
                id="light-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2"
                htmlFor="light-layout"
              >
                <i className="icon ti ti-brightness-up fs-7 me-2" />
                Light
              </label>
              <input
                type="radio"
                className="btn-check dark-layout"
                name="theme-layout"
                id="dark-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary rounded-2"
                htmlFor="dark-layout"
              >
                <i className="icon ti ti-moon fs-7 me-2" />
                Dark
              </label>
            </div>
            <h6 className="mt-5 fw-semibold fs-4 mb-2">Theme Direction</h6>
            <div className="d-flex flex-row gap-3 customizer-box" role="group">
              <input
                type="radio"
                className="btn-check"
                name="direction-l"
                id="ltr-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary"
                htmlFor="ltr-layout"
              >
                <i className="icon ti ti-text-direction-ltr fs-7 me-2" />
                LTR
              </label>
              <input
                type="radio"
                className="btn-check"
                name="direction-l"
                id="rtl-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary"
                htmlFor="rtl-layout"
              >
                <i className="icon ti ti-text-direction-rtl fs-7 me-2" />
                RTL
              </label>
            </div>
            <h6 className="mt-5 fw-semibold fs-4 mb-2">Theme Colors</h6>
            <div
              className="d-flex flex-row flex-wrap gap-3 customizer-box color-pallete"
              role="group"
            >
              <input
                type="radio"
                className="btn-check"
                name="color-theme-layout"
                id="Blue_Theme"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary d-flex align-items-center justify-content-center"
                onclick="handleColorTheme('Blue_Theme')"
                htmlFor="Blue_Theme"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="BLUE_THEME"
              >
                <div className="color-box rounded-circle d-flex align-items-center justify-content-center skin-1">
                  <i className="ti ti-check text-white d-flex icon fs-5" />
                </div>
              </label>
              <input
                type="radio"
                className="btn-check"
                name="color-theme-layout"
                id="Aqua_Theme"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary d-flex align-items-center justify-content-center"
                onclick="handleColorTheme('Aqua_Theme')"
                htmlFor="Aqua_Theme"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="AQUA_THEME"
              >
                <div className="color-box rounded-circle d-flex align-items-center justify-content-center skin-2">
                  <i className="ti ti-check text-white d-flex icon fs-5" />
                </div>
              </label>
              <input
                type="radio"
                className="btn-check"
                name="color-theme-layout"
                id="Purple_Theme"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary d-flex align-items-center justify-content-center"
                onclick="handleColorTheme('Purple_Theme')"
                htmlFor="Purple_Theme"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="PURPLE_THEME"
              >
                <div className="color-box rounded-circle d-flex align-items-center justify-content-center skin-3">
                  <i className="ti ti-check text-white d-flex icon fs-5" />
                </div>
              </label>
              <input
                type="radio"
                className="btn-check"
                name="color-theme-layout"
                id="green-theme-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary d-flex align-items-center justify-content-center"
                onclick="handleColorTheme('Green_Theme')"
                htmlFor="green-theme-layout"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="GREEN_THEME"
              >
                <div className="color-box rounded-circle d-flex align-items-center justify-content-center skin-4">
                  <i className="ti ti-check text-white d-flex icon fs-5" />
                </div>
              </label>
              <input
                type="radio"
                className="btn-check"
                name="color-theme-layout"
                id="cyan-theme-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary d-flex align-items-center justify-content-center"
                onclick="handleColorTheme('Cyan_Theme')"
                htmlFor="cyan-theme-layout"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="CYAN_THEME"
              >
                <div className="color-box rounded-circle d-flex align-items-center justify-content-center skin-5">
                  <i className="ti ti-check text-white d-flex icon fs-5" />
                </div>
              </label>
              <input
                type="radio"
                className="btn-check"
                name="color-theme-layout"
                id="orange-theme-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary d-flex align-items-center justify-content-center"
                onclick="handleColorTheme('Orange_Theme')"
                htmlFor="orange-theme-layout"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="ORANGE_THEME"
              >
                <div className="color-box rounded-circle d-flex align-items-center justify-content-center skin-6">
                  <i className="ti ti-check text-white d-flex icon fs-5" />
                </div>
              </label>
            </div>
            <h6 className="mt-5 fw-semibold fs-4 mb-2">Layout Type</h6>
            <div className="d-flex flex-row gap-3 customizer-box" role="group">
              <div>
                <input
                  type="radio"
                  className="btn-check"
                  name="page-layout"
                  id="vertical-layout"
                  autoComplete="off"
                />
                <label
                  className="btn p-9 btn-outline-primary"
                  htmlFor="vertical-layout"
                >
                  <i className="icon ti ti-layout-sidebar-right fs-7 me-2" />
                  Vertical
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="btn-check"
                  name="page-layout"
                  id="horizontal-layout"
                  autoComplete="off"
                />
                <label
                  className="btn p-9 btn-outline-primary"
                  htmlFor="horizontal-layout"
                >
                  <i className="icon ti ti-layout-navbar fs-7 me-2" />
                  Horizontal
                </label>
              </div>
            </div>
            <h6 className="mt-5 fw-semibold fs-4 mb-2">Container Option</h6>
            <div className="d-flex flex-row gap-3 customizer-box" role="group">
              <input
                type="radio"
                className="btn-check"
                name="layout"
                id="boxed-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary"
                htmlFor="boxed-layout"
              >
                <i className="icon ti ti-layout-distribute-vertical fs-7 me-2" />
                Boxed
              </label>
              <input
                type="radio"
                className="btn-check"
                name="layout"
                id="full-layout"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary"
                htmlFor="full-layout"
              >
                <i className="icon ti ti-layout-distribute-horizontal fs-7 me-2" />
                Full
              </label>
            </div>
            <h6 className="fw-semibold fs-4 mb-2 mt-5">Sidebar Type</h6>
            <div className="d-flex flex-row gap-3 customizer-box" role="group">
              <a href="javascript:void(0)" className="fullsidebar">
                <input
                  type="radio"
                  className="btn-check"
                  name="sidebar-type"
                  id="full-sidebar"
                  autoComplete="off"
                />
                <label
                  className="btn p-9 btn-outline-primary"
                  htmlFor="full-sidebar"
                >
                  <i className="icon ti ti-layout-sidebar-right fs-7 me-2" />
                  Full
                </label>
              </a>
              <div>
                <input
                  type="radio"
                  className="btn-check "
                  name="sidebar-type"
                  id="mini-sidebar"
                  autoComplete="off"
                />
                <label
                  className="btn p-9 btn-outline-primary"
                  htmlFor="mini-sidebar"
                >
                  <i className="icon ti ti-layout-sidebar fs-7 me-2" />
                  Collapse
                </label>
              </div>
            </div>
            <h6 className="mt-5 fw-semibold fs-4 mb-2">Card With</h6>
            <div className="d-flex flex-row gap-3 customizer-box" role="group">
              <input
                type="radio"
                className="btn-check"
                name="card-layout"
                id="card-with-border"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary"
                htmlFor="card-with-border"
              >
                <i className="icon ti ti-border-outer fs-7 me-2" />
                Border
              </label>
              <input
                type="radio"
                className="btn-check"
                name="card-layout"
                id="card-without-border"
                autoComplete="off"
              />
              <label
                className="btn p-9 btn-outline-primary"
                htmlFor="card-without-border"
              >
                <i className="icon ti ti-border-none fs-7 me-2" />
                Shadow
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
