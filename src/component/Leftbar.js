import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Book, BookLock, BookPlus, Calendar, CalendarPlus, IdCard } from "lucide-react";

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
              <li className="sidebar-item">
                <Link
                  className="sidebar-link has-arrow"
                  to="#0"
                  aria-expanded={openDropdown === "book"}
                  onClick={() => toggleDropdown("book")}
                >
                  <span className="d-flex">
                    {/* <i className="ti ti-user" /> */}
                    <Book />
                  </span>
                  <span className="hide-menu">Book</span>
                </Link>
                <ul
                  className={`first-level ${
                    openDropdown === "book" ? "show" : "collapse"
                  }`}
                  aria-expanded={openDropdown === "book"}
                >
                  <li className="sidebar-item">
                    <Link to="/add-book" className="sidebar-link">
                      <div className="round-16 d-flex align-items-center justify-content-center">
                        {/* <i className="ti ti-user-plus" /> */}
                        <BookPlus />
                      </div>
                      <span className="hide-menu">Add Book</span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to="/books-list" className="sidebar-link">
                      <div className="round-16 d-flex align-items-center justify-content-center">
                        {/* <i className="ti ti-list" /> */}
                        <BookLock />
                      </div>
                      <span className="hide-menu">Books List</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/users-list">
                  <span className="d-flex">
                    <i className="ti ti-users" />
                  </span>
                  <span className="hide-menu">Registered Users</span>
                </Link>
              </li>
              {/* event section */}

              <li className="sidebar-item">
                <Link
                  className="sidebar-link has-arrow"
                  to="#0"
                  aria-expanded={openDropdown === "event"}
                  onClick={() => toggleDropdown("event")}
                >
                  <span className="d-flex">
                    {/* <i className="ti ti-user" /> */}
                    <Calendar />
                  </span>
                  <span className="hide-menu">Event</span>
                </Link>
                <ul
                  className={`first-level ${
                    openDropdown === "event" ? "show" : "collapse"
                  }`}
                  aria-expanded={openDropdown === "event"}
                >
                  <li className="sidebar-item">
                    <Link to="/add-events" className="sidebar-link">
                      <div className="round-16 d-flex align-items-center justify-content-center">
                        {/* <i className="ti ti-user-plus" /> */}
                        <CalendarPlus />
                      </div>
                      <span className="hide-menu">Add Event</span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to="/events-list" className="sidebar-link">
                      <div className="round-16 d-flex align-items-center justify-content-center">
                        <i className="ti ti-list" />
                      </div>
                      <span className="hide-menu">Events List</span>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* certificates Section */}

              <li className="sidebar-item">
                <Link
                  className="sidebar-link has-arrow"
                  to="#0"
                  aria-expanded={openDropdown === "certificate"}
                  onClick={() => toggleDropdown("certificate")}
                >
                  <span className="d-flex">
                    {/* <i className="ti ti-user" /> */}
                    < IdCard/>
                  </span>
                  <span className="hide-menu">Certificates</span>
                </Link>
                <ul
                  className={`first-level ${
                    openDropdown === "certificate" ? "show" : "collapse"
                  }`}
                  aria-expanded={openDropdown === "certificate"}
                >
                  <li className="sidebar-item">
                    <Link to="/add-certificate" className="sidebar-link">
                      <div className="round-16 d-flex align-items-center justify-content-center">
                        {/* <i className="ti ti-user-plus" /> */}
                        <CalendarPlus />
                      </div>
                      <span className="hide-menu">Add Certificate</span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to="/certificates-list" className="sidebar-link">
                      <div className="round-16 d-flex align-items-center justify-content-center">
                        <i className="ti ti-list" />
                      </div>
                      <span className="hide-menu">Certificates List</span>
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
