import { useEffect, useState, useMemo } from "react";
import Topheader from "../../component/Topheader";
import axios from "axios";
import API_URL from "../../config";

const ITEMS_PER_PAGE = 10;

const VisitorLogs = () => {
  const [allVisitors, setAllVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dateFilter, setDateFilter] = useState("all"); // all, today, yesterday, last7days, last30days, custom
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [durationFilter, setDurationFilter] = useState("all"); // all, short, medium, long

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchVisitorLogs();
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [dateFilter, customStartDate, customEndDate, durationFilter]);

  const fetchVisitorLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/log/visiter`);
      if (response.status === 200) {
        setAllVisitors(response.data.visitors || []);
      } else {
        setError("Failed to fetch visitor logs. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching visitor logs", error);
      setError("An error occurred while fetching visitor logs.");
    } finally {
      setLoading(false);
    }
  };

  // Memoized filtered visitors for performance
  const filteredVisitors = useMemo(() => {
    let filtered = [...allVisitors];

    // Date filter
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
        filtered = filtered.filter(
          (visitor) => new Date(visitor.createdAt) >= today
        );
        break;
      case "yesterday":
        filtered = filtered.filter((visitor) => {
          const visitDate = new Date(visitor.createdAt);
          return visitDate >= yesterday && visitDate < today;
        });
        break;
      case "last7days":
        filtered = filtered.filter(
          (visitor) => new Date(visitor.createdAt) >= last7days
        );
        break;
      case "last30days":
        filtered = filtered.filter(
          (visitor) => new Date(visitor.createdAt) >= last30days
        );
        break;
      case "custom":
        if (customStartDate && customEndDate) {
          const startDate = new Date(customStartDate);
          const endDate = new Date(customEndDate);
          endDate.setHours(23, 59, 59, 999);
          filtered = filtered.filter((visitor) => {
            const visitDate = new Date(visitor.createdAt);
            return visitDate >= startDate && visitDate <= endDate;
          });
        }
        break;
      default:
        break;
    }

    // Duration filter
    switch (durationFilter) {
      case "short":
        filtered = filtered.filter((visitor) => visitor.duration < 120);
        break;
      case "medium":
        filtered = filtered.filter(
          (visitor) => visitor.duration >= 120 && visitor.duration < 300
        );
        break;
      case "long":
        filtered = filtered.filter((visitor) => visitor.duration >= 300);
        break;
      default:
        break;
    }

    return filtered;
  }, [allVisitors, dateFilter, customStartDate, customEndDate, durationFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredVisitors.length / ITEMS_PER_PAGE);

  const paginatedVisitors = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVisitors
      .slice(start, start + ITEMS_PER_PAGE)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [filteredVisitors, currentPage]);

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

  const getLocationString = (location) => {
    if (!location) return "Unknown";
    const { country, state } = location;
    if (country === "Unknown" && state === "Unknown") return "Unknown";
    if (country === "Unknown") return state;
    if (state === "Unknown") return country;
    return `${state}, ${country}`;
  };

  const getDurationBadge = (duration) => {
    if (duration < 30) return "badge bg-danger"; // Very short visit
    if (duration < 120) return "badge bg-warning"; // Short visit
    if (duration < 300) return "badge bg-info"; // Medium visit
    return "badge bg-success"; // Long visit
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

  const getFilteredStats = () => {
    const totalVisitors = filteredVisitors.length;
    const engagedVisitors = filteredVisitors.filter(
      (v) => v.duration >= 120
    ).length;
    const avgDuration =
      filteredVisitors.length > 0
        ? Math.round(
            filteredVisitors.reduce((sum, v) => sum + v.duration, 0) /
              filteredVisitors.length
          )
        : 0;
    const uniqueIPs = new Set(filteredVisitors.map((v) => v.ip)).size;

    return { totalVisitors, engagedVisitors, avgDuration, uniqueIPs };
  };

  const renderVisitorRow = (visitor, index) => {
    return (
      <tr key={`visitor-${visitor._id}-${index}`}>
        <td>
          <div className="fw-medium text-primary">
            {formatDateTime(visitor.createdAt)}
          </div>
          <small className="text-muted">
            {new Date(visitor.createdAt).toLocaleDateString("en-IN")}
          </small>
        </td>
        <td>
          <code className="bg-light px-2 py-1 rounded">{visitor.ip}</code>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <i className="ti ti-map-pin me-2 text-muted"></i>
            <span>{getLocationString(visitor.location)}</span>
          </div>
        </td>
        <td>
          <div className="text-wrap" style={{ maxWidth: "200px" }}>
            <code className="text-break">{visitor.lastPage}</code>
          </div>
        </td>
        <td>
          <span className={getDurationBadge(visitor.duration)}>
            {formatDuration(visitor.duration)}
          </span>
        </td>
        <td>
          <span className="badge bg-success">Active</span>
        </td>
      </tr>
    );
  };

  const stats = getFilteredStats();

  // Pagination controls JSX (placed below the table)
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    // Simple page range 1..totalPages, can be enhanced later
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
          aria-current={i === currentPage ? "page" : undefined}>
          <button
            className="page-link"
            onClick={() => setCurrentPage(i)}
            type="button">
            {i}
          </button>
        </li>
      );
    }

    return (
      <nav aria-label="Visitor logs pagination">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              type="button"
              aria-label="Previous">
              &laquo;
            </button>
          </li>
          {pages}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              type="button"
              aria-label="Next">
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <>
      <div className="main-wrapper">
        <Topheader />
        <div className="">
          <div className="page-wrapper mt-5">
            <div className="container-fluid">
              <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
                <div className="card-body px-4 py-3">
                  <div className="row align-items-center">
                    <div className="col-9">
                      <h4 className="fw-semibold mb-8">Visitor Logs</h4>
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

              <div className="row">
                <div className="col-12">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h5 className="mb-0">
                            Recent Visitors ({filteredVisitors.length} entries)
                          </h5>
                          <small className="text-muted">
                            {getDateRangeText()} • Total: {allVisitors.length}{" "}
                            visitors
                          </small>
                        </div>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={fetchVisitorLogs}
                          disabled={loading}>
                          <i
                            className={`ti ${
                              loading ? "ti-loader" : "ti-refresh"
                            } ${
                              loading ? "spinner-border spinner-border-sm" : ""
                            }`}></i>
                          {loading ? " Loading..." : " Refresh Logs"}
                        </button>
                      </div>

                      {/* Stats Cards */}
                      <div className="row mb-4">
                        <div className="col-md-3">
                          <div className="card bg-primary text-white">
                            <div className="card-body text-center">
                              <h4>{stats.totalVisitors}</h4>
                              <small>Filtered Visitors</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card bg-success text-white">
                            <div className="card-body text-center">
                              <h4>{stats.engagedVisitors}</h4>
                              <small>Engaged Visitors (2min+)</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card bg-info text-white">
                            <div className="card-body text-center">
                              <h4>{stats.avgDuration}s</h4>
                              <small>Avg. Duration</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="card bg-warning text-white">
                            <div className="card-body text-center">
                              <h4>{stats.uniqueIPs}</h4>
                              <small>Unique IPs</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Filter Section */}
                      <div className="row mb-4">
                        <div className="col-12">
                          <div className="card border">
                            <div className="card-body py-3">
                              <div className="row align-items-center">
                                <div className="col-md-4">
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
                                    <div className="col-md-4">
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
                                    <div className="col-md-4">
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
                                        min={customStartDate}
                                      />
                                    </div>
                                  </>
                                )}

                                <div className="col-md-4 mt-3 mt-md-0">
                                  <label className="form-label fw-semibold mb-2">
                                    Duration Filter
                                  </label>
                                  <select
                                    className="form-select"
                                    value={durationFilter}
                                    onChange={(e) =>
                                      setDurationFilter(e.target.value)
                                    }>
                                    <option value="all">All Durations</option>
                                    <option value="short">
                                      Short (&lt; 2 min)
                                    </option>
                                    <option value="medium">
                                      Medium (2-5 min)
                                    </option>
                                    <option value="long">
                                      Long (&gt;= 5 min)
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                          <button
                            type="button"
                            className="btn btn-sm btn-link ms-3"
                            onClick={fetchVisitorLogs}>
                            Retry
                          </button>
                        </div>
                      )}

                      {/* Visitor Table */}
                      <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>IP</th>
                              <th>Location</th>
                              <th>Last Page</th>
                              <th>Duration</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="6" className="text-center py-4">
                                  Loading visitor logs...
                                </td>
                              </tr>
                            ) : paginatedVisitors.length === 0 ? (
                              <tr>
                                <td colSpan="6" className="text-center py-4">
                                  No visitors found for the selected filters.
                                </td>
                              </tr>
                            ) : (
                              paginatedVisitors.map(renderVisitorRow)
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination controls */}
                      <div className="mt-3">{renderPagination()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitorLogs;
