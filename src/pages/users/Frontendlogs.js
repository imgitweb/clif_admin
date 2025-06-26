import { useEffect, useState, useMemo } from "react";
import Topheader from "../../component/Topheader";
import axios from "axios";
import API_URL from "../../config";

const ITEMS_PER_PAGE = 25;

const FrontendLogs = () => {
  const [allLogs, setAllLogs] = useState([]);
  const [processedLogs, setProcessedLogs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFrontendLogs();
  }, []);

  const fetchFrontendLogs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${API_URL}/logs`);
      if (response.status === 200) {
        setAllLogs(response.data);
        processFrontendLogs(response.data);
      }
    } catch (err) {
      console.error("Error fetching logs", err);
      setError("Failed to fetch logs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const processFrontendLogs = (logsData) => {
    const processedData = [];

    if (logsData?.frontendLogs) {
      Object.entries(logsData.frontendLogs).forEach(([ipAddress, userLogs]) => {
        userLogs.forEach((logEntry) => {
          logEntry.events.forEach((event) => {
            processedData.push({
              type: "frontend",
              ip: ipAddress,
              date: logEntry.date,
              timestamp: event.timestamp,
              user: event.user,
              message: event.message,
              dateObj: new Date(event.timestamp),
            });
          });
        });
      });
    }

    if (logsData?.backendLogs) {
      Object.entries(logsData.backendLogs).forEach(([userId, userLogs]) => {
        userLogs.forEach((logEntry) => {
          logEntry.events.forEach((event) => {
            processedData.push({
              type: "backend",
              userId,
              date: logEntry.date,
              timestamp: event.timestamp,
              user: event.user,
              method: event.method,
              path: event.path,
              status: event.status,
              ip: event.ip,
              location: event.location,
              device: event.device,
              os: event.os,
              browser: event.browser,
              duration: event.duration,
              reason: event.reason,
              dateObj: new Date(event.timestamp),
            });
          });
        });
      });
    }

    processedData.sort((a, b) => b.dateObj - a.dateObj);
    setProcessedLogs(processedData);
    setCurrentPage(1);
  };

  const filteredLogs = useMemo(() => {
    const tabFiltered =
      activeTab === "all"
        ? processedLogs
        : processedLogs.filter((log) => log.type === activeTab);

    if (!searchTerm.trim()) return tabFiltered;

    const search = searchTerm.toLowerCase();
    return tabFiltered.filter((log) =>
      Object.values(log).join(" ").toLowerCase().includes(search)
    );
  }, [processedLogs, activeTab, searchTerm]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredLogs, currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

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

  const getBadgeClass = (type) =>
    ({
      error: "badge bg-danger",
      warning: "badge bg-warning",
      success: "badge bg-success",
      info: "badge bg-info",
    }[type] || "badge bg-info");

  const getMessageType = (message, type, status) => {
    if (type === "backend") {
      if (status >= 400) return "error";
      if (status >= 300) return "warning";
      return "success";
    } else {
      if (message?.includes("ERROR") || message?.includes("not found"))
        return "error";
      if (message?.includes("ANALYSIS")) return "info";
      if (message?.includes("EVENT")) return "success";
      return "info";
    }
  };

  const extractEventData = (message) => {
    if (message.includes("EVENT:")) {
      const parts = message.split(" | ");
      return {
        eventType: parts[0].replace("EVENT: ", ""),
        page:
          parts.find((p) => p.startsWith("Page:"))?.replace("Page: ", "") ||
          "N/A",
      };
    }
    return null;
  };

  const renderFrontendLogRow = (log, index) => {
    const messageType = getMessageType(log.message, log.type);
    const eventData = extractEventData(log.message);
    return (
      <tr key={`frontend-${log.timestamp}-${index}`}>
        <td>{formatDateTime(log.timestamp)}</td>
        <td>
          <span className="badge bg-primary">Frontend</span>
        </td>
        <td>
          <code>{log.ip}</code>
        </td>
        <td>
          {eventData ? (
            <div>
              <strong>{eventData.eventType}</strong>
              <br />
              <small className="text-muted">Page: {eventData.page}</small>
            </div>
          ) : (
            <div>{log.message}</div>
          )}
        </td>
        <td>
          <span className={getBadgeClass(messageType)}>
            {messageType.toUpperCase()}
          </span>
        </td>
        <td>-</td>
        <td>-</td>
      </tr>
    );
  };

  const renderBackendLogRow = (log, index) => {
    const messageType = getMessageType(null, log.type, log.status);
    return (
      <tr key={`backend-${log.timestamp}-${index}`}>
        <td>{formatDateTime(log.timestamp)}</td>
        <td>
          <span className="badge bg-warning">Backend</span>
        </td>
        <td>
          <code>{log.ip}</code>
        </td>
        <td>
          <code>{log.user}</code>
        </td>
        <td>
          <span className="badge bg-secondary me-1">{log.method}</span>
          <code>{log.path}</code>
          <br />
          <small className="text-muted">
            {log.device} | {log.os} | {log.browser}
          </small>
        </td>
        <td>
          <span className={getBadgeClass(messageType)}>
            {messageType.toUpperCase()}
          </span>
        </td>
        <td>
          <span
            className={getBadgeClass(
              getMessageType(null, log.type, log.status)
            )}>
            {log.status}
          </span>
        </td>
        <td>
          <small>{log.duration}</small>
        </td>
      </tr>
    );
  };

  return (
    <div className="main-wrapper">
      <Topheader />
      <div className="">
        <div className="page-wrapper mt-5">
          <div className="container-fluid">
            <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
              <div className="card-body px-4 py-3">
                <div className="row align-items-center">
                  <div className="col-9">
                    <h4 className="fw-semibold mb-8">Application Logs</h4>
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
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Search logs..."
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={fetchFrontendLogs}>
                        Refresh Logs
                      </button>
                    </div>

                    {/* Tabs */}
                    <ul className="nav nav-tabs mb-3">
                      {["all", "frontend", "backend"].map((tab) => (
                        <li className="nav-item" key={tab}>
                          <button
                            className={`nav-link ${
                              activeTab === tab ? "active" : ""
                            }`}
                            onClick={() => setActiveTab(tab)}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)} (
                            {
                              processedLogs.filter(
                                (l) => tab === "all" || l.type === tab
                              ).length
                            }
                            )
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* Error Message */}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {loading ? (
                      <div className="text-center py-5">Loading logs...</div>
                    ) : filteredLogs.length === 0 ? (
                      <div className="text-center text-muted py-5">
                        No logs to display.
                      </div>
                    ) : (
                      <>
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead className="table-dark">
                              <tr>
                                <th>Date & Time</th>
                                <th>Type</th>
                                <th>IP</th>
                                {activeTab === "backend" && <th>User</th>}
                                <th>Details</th>
                                <th>Status</th>
                                <th>Response</th>
                                <th>Status</th>

                                {activeTab === "backend" ? (
                                  <th>Duration</th>
                                ) : (
                                  <th>Page</th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {paginatedLogs.map((log, index) =>
                                log.type === "frontend"
                                  ? renderFrontendLogRow(log, index)
                                  : renderBackendLogRow(log, index)
                              )}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <span>
                            Showing{" "}
                            {Math.min(
                              (currentPage - 1) * ITEMS_PER_PAGE + 1,
                              filteredLogs.length
                            )}
                            –
                            {Math.min(
                              currentPage * ITEMS_PER_PAGE,
                              filteredLogs.length
                            )}{" "}
                            of {filteredLogs.length}
                          </span>
                          <div>
                            <button
                              className="btn btn-sm btn-secondary me-2"
                              disabled={currentPage === 1}
                              onClick={() =>
                                setCurrentPage((prev) => prev - 1)
                              }>
                              Prev
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              disabled={currentPage === totalPages}
                              onClick={() =>
                                setCurrentPage((prev) => prev + 1)
                              }>
                              Next
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendLogs;
