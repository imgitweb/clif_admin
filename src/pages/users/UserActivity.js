import { useEffect, useState, useMemo } from "react";
import Topheader from "../../component/Topheader";
import axios from "axios";
import API_URL from "../../config";

const PAGE_SIZE = 10; // Number of users per page

const UserActivity = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all"); // all, online, offline
  const [dateFilter, setDateFilter] = useState("all"); // all, today, yesterday, last7days, last30days, custom
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUserActivity();
  }, []);

  // Apply filters and reset to page 1 on filter change
  useEffect(() => {
    applyFilters();
    setCurrentPage(1);
  }, [allUsers, activeFilter, dateFilter, customStartDate, customEndDate]);

  const fetchUserActivity = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/log/getUserActivity`);
      if (response.status === 200) {
        setAllUsers(response.data.visitors || []);
      } else {
        setError("Failed to fetch user activity");
      }
    } catch (err) {
      setError("Error fetching user activity");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allUsers];
    filtered = filterUsersByDate(filtered);

    if (activeFilter === "online") {
      filtered = filtered.filter((user) => isUserOnline(user));
    } else if (activeFilter === "offline") {
      filtered = filtered.filter((user) => !isUserOnline(user));
    }

    setFilteredUsers(filtered);
  };

  const filterUsersByDate = (users) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const last7days = new Date(today);
    last7days.setDate(last7days.getDate() - 7);
    const last30days = new Date(today);
    last30days.setDate(last30days.getDate() - 30);

    switch (dateFilter) {
      case "today":
        return users.filter((user) => new Date(user.lastLogin) >= today);
      case "yesterday":
        return users.filter((user) => {
          const loginDate = new Date(user.lastLogin);
          return loginDate >= yesterday && loginDate < today;
        });
      case "last7days":
        return users.filter((user) => new Date(user.lastLogin) >= last7days);
      case "last30days":
        return users.filter((user) => new Date(user.lastLogin) >= last30days);
      case "custom":
        if (customStartDate && customEndDate) {
          const startDate = new Date(customStartDate);
          const endDate = new Date(customEndDate);
          endDate.setHours(23, 59, 59, 999);
          return users.filter((user) => {
            const loginDate = new Date(user.lastLogin);
            return loginDate >= startDate && loginDate <= endDate;
          });
        }
        return users;
      default:
        return users;
    }
  };

  const isUserOnline = (user) => {
    if (!user.lastLogout) return true;
    const now = new Date();
    const lastActivity = new Date(user.lastLogout);
    const timeDiff = (now - lastActivity) / (1000 * 60);
    return timeDiff < 5; // online if last logout within 5 mins
  };

  // Pagination calculation with useMemo for performance
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredUsers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // ... your existing utility functions like formatDateTime, formatDuration, getDurationBadge, getStatusBadge, getLastActivityTime, renderUserRow remain unchanged
  // I will include them below without changes for completeness:

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDuration = (seconds) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes < 60) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getDurationBadge = (duration) => {
    if (duration < 60) return "badge bg-danger";
    if (duration < 300) return "badge bg-warning";
    if (duration < 1800) return "badge bg-info";
    return "badge bg-success";
  };

  const getStatusBadge = (user) => {
    return isUserOnline(user) ? "badge bg-success" : "badge bg-secondary";
  };

  const getLastActivityTime = (user) => {
    if (!user.lastLogout) return "Currently active";
    const now = new Date();
    const lastActivity = new Date(user.lastLogout);
    const timeDiff = Math.floor((now - lastActivity) / (1000 * 60));

    if (timeDiff < 1) return "Just now";
    if (timeDiff < 60) return `${timeDiff} min ago`;
    if (timeDiff < 1440) return `${Math.floor(timeDiff / 60)} hr ago`;
    return `${Math.floor(timeDiff / 1440)} days ago`;
  };

  const renderUserRow = (user, index) => {
    const isOnline = isUserOnline(user);

    return (
      <tr
        key={`user-${user._id}-${index}`}
        className={isOnline ? "table-success" : ""}>
        <td>
          <div className="d-flex align-items-center">
            <div
              className={`rounded-circle me-3 ${
                isOnline ? "bg-success" : "bg-secondary"
              }`}
              style={{ width: "10px", height: "10px" }}></div>
            <div>
              <div className="fw-medium">{user.userName}</div>
              <small className="text-muted">ID: {user.user}</small>
            </div>
          </div>
        </td>
        <td>
          <div className="fw-medium text-primary">
            {formatDateTime(user.lastLogin)}
          </div>
          <small className="text-muted">
            {new Date(user.lastLogin).toLocaleDateString("en-IN")}
          </small>
        </td>
        <td>
          {user.lastLogout ? (
            <div>
              <div className="fw-medium">{formatDateTime(user.lastLogout)}</div>
              <small className="text-muted">{getLastActivityTime(user)}</small>
            </div>
          ) : (
            <div className="text-success fw-medium">Currently Active</div>
          )}
        </td>
        <td>
          <span className={getDurationBadge(user.duration)}>
            {formatDuration(user.duration)}
          </span>
        </td>
        <td>
          <span className={getStatusBadge(user)}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </td>
        <td>
          <div className="fw-medium text-primary">
            {formatDateTime(user.createdAt)}
          </div>
          <small className="text-muted">First visit</small>
        </td>
      </tr>
    );
  };

  const getOnlineUsers = () =>
    filteredUsers.filter((user) => isUserOnline(user));
  const getOfflineUsers = () =>
    filteredUsers.filter((user) => !isUserOnline(user));
  const getAverageSessionTime = () => {
    if (filteredUsers.length === 0) return 0;
    return Math.round(
      filteredUsers.reduce((sum, user) => sum + user.duration, 0) /
        filteredUsers.length
    );
  };

  const getDateRangeText = () => {
    switch (dateFilter) {
      case "today":
        return "Today";
      case "yesterday":
        return "Yesterday";
      case "last7days":
        return "Last 7 days";
      case "last30days":
        return "Last 30 days";
      case "custom":
        if (customStartDate && customEndDate) {
          return `${new Date(
            customStartDate
          ).toLocaleDateString()} - ${new Date(
            customEndDate
          ).toLocaleDateString()}`;
        }
        return "Custom range";
      default:
        return "All time";
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <Topheader />
        <div className="">
          <div className="page-wrapper mt-5">
            <div className="container-fluid">
              {/* Header Card */}
              <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
                <div className="card-body px-4 py-3">
                  <div className="row align-items-center">
                    <div className="col-9">
                      <h4 className="fw-semibold mb-8">User Activity</h4>
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <a
                              className="text-muted text-decoration-none"
                              href="../dark/index.html">
                              Home
                            </a>
                          </li>
                        </ol>
                      </nav>
                    </div>
                    <div className="col-3">
                      <div className="text-center mb-n5">
                        <img
                          src="../../assets/assets/images/backgrounds/welcome-bg.svg"
                          alt="breadcrumb-img"
                          className="img-fluid mb-n4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats and Filter Section */}
              <div className="row">
                <div className="col-12">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      {/* Top Info and Refresh */}
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h5 className="mb-0">
                            User Activity ({filteredUsers.length} users)
                          </h5>
                          <small className="text-muted">
                            {getDateRangeText()} • Total: {allUsers.length}{" "}
                            users
                          </small>
                        </div>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={fetchUserActivity}
                          disabled={loading}>
                          <i
                            className={`ti ${
                              loading ? "ti-loader" : "ti-refresh"
                            } ${
                              loading ? "spinner-border spinner-border-sm" : ""
                            }`}></i>
                          {loading ? " Loading..." : " Refresh"}
                        </button>
                      </div>

                      {/* Stats Cards */}
                      <div className="row mb-4">
                        <div className="col-md-3">
                          <div className="card bg-success text-white">
                            <div className="card-body text-center">
                              <h4>{getOnlineUsers().length}</h4>
                              <small>Online Users</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card bg-secondary text-white">
                            <div className="card-body text-center">
                              <h4>{getOfflineUsers().length}</h4>
                              <small>Offline Users</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card bg-info text-white">
                            <div className="card-body text-center">
                              <h4>{formatDuration(getAverageSessionTime())}</h4>
                              <small>Avg. Session Time</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card bg-primary text-white">
                            <div className="card-body text-center">
                              <h4>{filteredUsers.length}</h4>
                              <small>Filtered Users</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Date Filter */}
                      <div className="row mb-4">
                        <div className="col-12">
                          <div className="card border">
                            <div className="card-body py-3">
                              <div className="row align-items-center">
                                <div className="col-md-6">
                                  <label className="form-label fw-semibold mb-2">
                                    <i className="ti ti-calendar me-2"></i>Date
                                    Filter
                                  </label>
                                  <select
                                    className="form-select"
                                    value={dateFilter}
                                    onChange={(e) =>
                                      setDateFilter(e.target.value)
                                    }>
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="yesterday">Yesterday</option>
                                    <option value="last7days">
                                      Last 7 Days
                                    </option>
                                    <option value="last30days">
                                      Last 30 Days
                                    </option>
                                    <option value="custom">Custom Range</option>
                                  </select>
                                </div>
                                {dateFilter === "custom" && (
                                  <>
                                    <div className="col-md-3">
                                      <label className="form-label fw-semibold mb-2">
                                        Start Date
                                      </label>
                                      <input
                                        type="date"
                                        className="form-control"
                                        value={customStartDate}
                                        onChange={(e) =>
                                          setCustomStartDate(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="col-md-3">
                                      <label className="form-label fw-semibold mb-2">
                                        End Date
                                      </label>
                                      <input
                                        type="date"
                                        className="form-control"
                                        value={customEndDate}
                                        onChange={(e) =>
                                          setCustomEndDate(e.target.value)
                                        }
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status Tabs */}
                      <ul className="nav nav-tabs mb-4">
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              activeFilter === "all" ? "active" : ""
                            }`}
                            onClick={() => setActiveFilter("all")}>
                            All Users ({filteredUsers.length})
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              activeFilter === "online" ? "active" : ""
                            }`}
                            onClick={() => setActiveFilter("online")}>
                            Online Users ({getOnlineUsers().length})
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              activeFilter === "offline" ? "active" : ""
                            }`}
                            onClick={() => setActiveFilter("offline")}>
                            Offline Users ({getOfflineUsers().length})
                          </button>
                        </li>
                      </ul>

                      {/* Error Display */}
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

                      {/* Table */}
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead>
                            <tr>
                              <th>User</th>
                              <th>Last Login</th>
                              <th>Last Logout</th>
                              <th>Duration</th>
                              <th>Status</th>
                              <th>First Visit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {!loading && paginatedUsers.length > 0 ? (
                              paginatedUsers.map(renderUserRow)
                            ) : loading ? (
                              <tr>
                                <td colSpan="6" className="text-center">
                                  Loading...
                                </td>
                              </tr>
                            ) : (
                              <tr>
                                <td colSpan="6" className="text-center">
                                  No users found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Controls */}
                      {totalPages > 1 && (
                        <nav aria-label="Page navigation" className="mt-3">
                          <ul className="pagination justify-content-center">
                            <li
                              className={`page-item ${
                                currentPage === 1 ? "disabled" : ""
                              }`}>
                              <button
                                className="page-link"
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }>
                                Previous
                              </button>
                            </li>
                            {[...Array(totalPages)].map((_, idx) => {
                              const pageNum = idx + 1;
                              return (
                                <li
                                  key={`page-${pageNum}`}
                                  className={`page-item ${
                                    pageNum === currentPage ? "active" : ""
                                  }`}>
                                  <button
                                    className="page-link"
                                    onClick={() => handlePageChange(pageNum)}>
                                    {pageNum}
                                  </button>
                                </li>
                              );
                            })}
                            <li
                              className={`page-item ${
                                currentPage === totalPages ? "disabled" : ""
                              }`}>
                              <button
                                className="page-link"
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }>
                                Next
                              </button>
                            </li>
                          </ul>
                        </nav>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer or other sections here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserActivity;
