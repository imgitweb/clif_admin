import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Leftbar({ onButtonClick }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div>
      <aside className="left-sidebar with-vertical">
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-between">
            <Link to="/dashboard" className="text-nowrap logo-img">
              <img
                src="./assets/logo/logo-light.png"
                className="dark-logo"
                alt="Logo-Dark"
                width="50px"
              />
            </Link>
            <Link
              to="#0"
              onClick={onButtonClick}
              className="sidebartoggler ms-auto text-decoration-none fs-5 d-block d-xl-none"
            >
              <i className="ti ti-x" />
            </Link>
          </div>

          <nav className="sidebar-nav scroll-sidebar" data-simplebar>
            <ul id="sidebarnav">
              {/* Mentor Section */}
              <li className="sidebar-item">
                <Link
                  className="sidebar-link has-arrow"
                  to="#0"
                  aria-expanded={openDropdown === "mentor"}
                  onClick={() => toggleDropdown("mentor")}
                >
                  <span className="d-flex">
                    <i className="ti ti-user" />
                  </span>
                  <span className="hide-menu">Mentor</span>
                </Link>
                <ul
                  className={`first-level ${
                    openDropdown === "mentor" ? "show" : "collapse"
                  }`}
                  aria-expanded={openDropdown === "mentor"}
                >
                  <li className="sidebar-item">
                    <Link to="/add-mentor" className="sidebar-link">
                      <div className="round-16 d-flex align-items-center justify-content-center">
                        <i className="ti ti-user-plus" />
                      </div>
                      <span className="hide-menu">Add Mentor</span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to="/mentor-list" className="sidebar-link">
                      <div className="round-16 d-flex align-items-center justify-content-center">
                        <i className="ti ti-list" />
                      </div>
                      <span className="hide-menu">Mentor List</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          {/* Profile Section */}
          <div className="fixed-profile p-3 mx-4 mb-2 bg-secondary-subtle rounded mt-3">
            <div className="hstack gap-3">
              <div className="john-img">
                <img
                  src="../../assets/assets/images/profile/user-1.jpg"
                  alt=""
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="john-title">
                <h6>Mathew</h6>
                <span>Designer</span>
              </div>
              <button
                type="button"
                aria-label="logout"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="logout"
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#007bff",
                }}
              >
                <i style={{ fontSize: "1.5rem" }}></i>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
