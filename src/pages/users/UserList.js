import React, { useState, useEffect } from "react";
import Topheader from "../../component/Topheader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SuccessNotification } from "../../tosterNotification/tosters";
import API_URL from "../../config";

const BASE_APT_URL = "http://0.0.0.0:5000";

const UsersList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [mentors, setMentors] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const usersPerPage = 12;
  const navigate = useNavigate();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I4NjZlZDEzYWNiMWI4NzFhNDMwYWYiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3NDAxNDExODQsImV4cCI6MTc0MDIyNzU4NH0.T29qiJ3YnuJ12_ENGVp7_aiIgEDBZYb6QD5xHUkbBOs";

  useEffect(() => {
    fetchUsers();
    fetchMentors();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.post(
      `http://localhost:5000/api/auth/getUsers`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setAllUsers(
      response.data.data.map((users) => ({
        ...users,
        createdAt: new Date(users.createdAt).toLocaleDateString(),
      }))
    );
    SuccessNotification("All users fetched");
  };

  const fetchMentors = async () => {
    try {
      const response = await axios.post(`${API_URL}/admin/api/get-mentor`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.data);
      setMentors(response.data.data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  const handleAssignMentor = async (mentorId) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/mentors/assign-mentor`,
        {
          mentor_id: mentorId,
          user_id: selectedUser._id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      SuccessNotification("Mentor assigned successfully!");
      setShowMentorModal(false);
    } catch (error) {
      console.error("Error assigning mentor:", error);
    }
  };

  const handleRoadMap = (user) => {
    navigate("/career-path", {
      state: { user: user._id, userName: `${user.firstname} ${user.lastname}` },
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = Array.isArray(allUsers)
    ? allUsers.filter(
        (user) =>
          user.firstname
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase()) ||
          user.lastname
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    : [];

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="main-wrapper">
      <Topheader />
      <div className="body-wrapper">
        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h5 className="card-title fw-semibold">Users</h5>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <button className="btn btn-primary">
                      <i className="ti ti-search"></i>
                    </button>
                  </div>
                </div>

                <div className="row">
                  {currentUsers.map((user) => (
                    <div
                      className="col-md-6 col-lg-6 col-xl-4 mb-4"
                      key={user.id}
                    >
                      <div className="card shadow-sm h-100">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center mb-3">
                            <img
                              src={`https://0.0.0.0:5000${user.headshot}`}
                              alt={user.name}
                              className="rounded-circle"
                              width="50"
                              height="50"
                            />
                            <div className="ms-3">
                              <h6 className="mb-0 fw-semibold">
                                {user.firstname} {user.lastname}
                              </h6>
                              <small className="text-muted">{user.role}</small>
                            </div>
                          </div>

                          <div className="mb-2">
                            <div className="d-flex align-items-center mb-2">
                              <i className="ti ti-mail text-muted me-1"></i>
                              <span className="fs-3">{user.email}</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <i className="ti ti-calendar text-muted me-2"></i>
                              <span className="fs-3">
                                Joined: {user.createdAt}
                              </span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <i className="ti ti-user text-muted me-2"></i>
                              <span className="fs-3">
                                Gender: {user.gender}
                              </span>
                            </div>
                          </div>

                          <div className="d-flex justify-content-between mt-4">
                            <button className="btn btn-primary btn-sm">
                              <i className="ti ti-edit me-1"></i>Edit
                            </button>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleRoadMap(user)}
                            >
                              <i className="ti ti-road me-1"></i>Road Map
                            </button>
                            {/* <button className="btn btn-outline-danger btn-sm">
                              <i className="ti ti-trash me-1"></i>Delete
                            </button> */}
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowMentorModal(true);
                              }}
                            >
                              <i className="ti ti-user-plus me-1"></i>Assign
                              Mentor
                            </button>
                            {/* <button className="btn btn-danger">
                              <i className="ti ti-trash me-1"></i> Delete
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {filteredUsers.length > 0 ? (
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div>
                      <span className="text-muted">
                        Showing {indexOfFirstUser + 1}-
                        {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
                        {filteredUsers.length} users
                      </span>
                    </div>
                    <nav aria-label="Page navigation">
                      <ul className="pagination mb-0">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <li
                            key={page}
                            className={`page-item ${
                              currentPage === page ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          </li>
                        ))}

                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                ) : (
                  <div className="alert alert-info mt-4">
                    No users found matching your search criteria.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mentor Assignment Modal */}
      {showMentorModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            {" "}
            {/* Added modal-dialog-centered */}
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Assign Mentor to {selectedUser?.firstname}{" "}
                  {selectedUser?.lastname}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowMentorModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <h6>Select a Mentor:</h6>
                <div className="list-group">
                  {mentors.map((mentor) => (
                    <div
                      key={mentor._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <img
                          src={`http://localhost:5000${mentor.image}`}
                          alt={mentor.name}
                          className="rounded-circle"
                          width="40"
                          height="40"
                        />
                        <span className="ms-2">{mentor.name}</span>
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAssignMentor(mentor._id)}
                      >
                        Assign
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                {" "}
                {/* Added d-flex justify-content-between */}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowMentorModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAssignMentor(selectedUser?._id)}
                >
                  Assign Mentor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
