import { useEffect, useState } from "react";
import Topheader from "../../component/Topheader";
import axios from "axios";
import API_URL from "../../config";

const FrontendLogs = () => {
  const [allLogs, setAllLogs] = useState([]);
  const [processedLogs, setProcessedLogs] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // all, frontend, backend
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    fetchFrontendLogs();
  }, []);

  useEffect(() => {
    filterLogsByTab();
  }, [processedLogs, activeTab]);

  const fetchFrontendLogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/logs`);
      if (response.status === 200) {
        console.log(response.data);
        setAllLogs(response.data);
        processFrontendLogs(response.data);
      }
    } catch (error) {
      console.error("Error fetching logs", error);
    }
  };

  const processFrontendLogs = (logsData) => {
    const processedData = [];

    // Process Frontend Logs
    if (logsData && logsData.frontendLogs) {
      Object.keys(logsData.frontendLogs).forEach((ipAddress) => {
        const userLogs = logsData.frontendLogs[ipAddress];

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

    // Process Backend Logs
    if (logsData && logsData.backendLogs) {
      Object.keys(logsData.backendLogs).forEach((userId) => {
        const userLogs = logsData.backendLogs[userId];

        userLogs.forEach((logEntry) => {
          logEntry.events.forEach((event) => {
            processedData.push({
              type: "backend",
              userId: userId,
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

    // Sort by latest date/timestamp first
    processedData.sort((a, b) => b.dateObj - a.dateObj);

    setProcessedLogs(processedData);
  };

  const filterLogsByTab = () => {
    if (activeTab === "all") {
      setFilteredLogs(processedLogs);
    } else {
      setFilteredLogs(processedLogs.filter((log) => log.type === activeTab));
    }
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

  const getMessageType = (message, type, status) => {
    if (type === "backend") {
      if (status >= 400) return "error";
      if (status >= 300) return "warning";
      return "success";
    } else {
      if (message.includes("ERROR") || message.includes("not found")) {
        return "error";
      } else if (message.includes("ANALYSIS")) {
        return "info";
      } else if (message.includes("EVENT")) {
        return "success";
      }
      return "info";
    }
  };

  const getBadgeClass = (type) => {
    switch (type) {
      case "error":
        return "badge bg-danger";
      case "warning":
        return "badge bg-warning";
      case "success":
        return "badge bg-success";
      default:
        return "badge bg-info";
    }
  };

  const getStatusBadge = (status) => {
    if (status >= 200 && status < 300) return "badge bg-success";
    if (status >= 300 && status < 400) return "badge bg-warning";
    if (status >= 400) return "badge bg-danger";
    return "badge bg-secondary";
  };

  const extractEventData = (message) => {
    if (message.includes("EVENT:")) {
      const parts = message.split(" | ");
      const eventType = parts[0].replace("EVENT: ", "");
      const page =
        parts.find((p) => p.startsWith("Page:"))?.replace("Page: ", "") ||
        "N/A";
      return { eventType, page };
    }
    return null;
  };

  const renderFrontendLogRow = (log, index) => {
    const messageType = getMessageType(log.message, log.type);
    const eventData = extractEventData(log.message);

    return (
      <tr key={`frontend-${log.timestamp}-${index}`}>
        <td>
          <div className="fw-medium text-primary">
            {formatDateTime(log.timestamp)}
          </div>
          <small className="text-muted">{log.date}</small>
        </td>
        <td>
          <span className="badge bg-primary">Frontend</span>
        </td>
        <td>
          <code className="bg-light px-2 py-1 rounded">{log.ip}</code>
        </td>
        <td>
          {eventData ? (
            <div>
              <div className="fw-medium text-success">
                {eventData.eventType}
              </div>
              <small className="text-muted">Page: {eventData.page}</small>
            </div>
          ) : (
            <div className="text-wrap" style={{ maxWidth: "300px" }}>
              {log.message}
            </div>
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
        <td>
          <div className="fw-medium text-primary">
            {formatDateTime(log.timestamp)}
          </div>
          <small className="text-muted">{log.date}</small>
        </td>
        <td>
          <span className="badge bg-warning">Backend</span>
        </td>
        <td>
          <code className="bg-light px-2 py-1 rounded">{log.ip}</code>
        </td>
        <td>
          <code className="bg-light px-2 py-1 rounded">{log.user}</code>
        </td>
        <td>
          <div>
            <span className="badge bg-secondary me-1">{log.method}</span>
            <code>{log.path}</code>
          </div>
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
          <span className={getStatusBadge(log.status)}>{log.status}</span>
        </td>
        <td>
          <small className="text-muted">{log.duration}</small>
        </td>
      </tr>
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
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h5 className="mb-0">
                            Latest Logs ({filteredLogs.length} entries)
                          </h5>
                          <small className="text-muted">
                            Total: {processedLogs.length} | Frontend:{" "}
                            {
                              processedLogs.filter((l) => l.type === "frontend")
                                .length
                            }{" "}
                            | Backend:{" "}
                            {
                              processedLogs.filter((l) => l.type === "backend")
                                .length
                            }
                          </small>
                        </div>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={fetchFrontendLogs}>
                          <i className="ti ti-refresh"></i> Refresh Logs
                        </button>
                      </div>

                      {/* Tabs */}
                      <ul className="nav nav-tabs mb-4" role="tablist">
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              activeTab === "all" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("all")}>
                            All Logs ({processedLogs.length})
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              activeTab === "frontend" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("frontend")}>
                            Frontend (
                            {
                              processedLogs.filter((l) => l.type === "frontend")
                                .length
                            }
                            )
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              activeTab === "backend" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("backend")}>
                            Backend (
                            {
                              processedLogs.filter((l) => l.type === "backend")
                                .length
                            }
                            )
                          </button>
                        </li>
                      </ul>

                      {filteredLogs.length === 0 ? (
                        <div className="text-center py-5">
                          <div className="mb-3">
                            <i
                              className="ti ti-file-search"
                              style={{ fontSize: "3rem", color: "#ccc" }}></i>
                          </div>
                          <h6 className="text-muted">No logs found</h6>
                          <p className="text-muted small">
                            There are no logs to display for the selected
                            filter.
                          </p>
                        </div>
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-striped table-hover">
                            <thead className="table-dark">
                              <tr>
                                <th>Date & Time</th>
                                <th>Type</th>
                                <th>IP Address</th>
                                {activeTab === "backend" ? <th>userId</th> : ""}
                                <th>Details</th>
                                <th>Status</th>
                                <th>Response</th>
                                {activeTab === "backend" ? (
                                  <th>Duration</th>
                                ) : (
                                  <th>page</th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {filteredLogs.map((log, index) => {
                                return log.type === "frontend"
                                  ? renderFrontendLogRow(log, index)
                                  : renderBackendLogRow(log, index);
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
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

export default FrontendLogs;
