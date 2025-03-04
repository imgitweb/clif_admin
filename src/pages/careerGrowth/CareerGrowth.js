import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Search, Grid, List, ChevronRight, ChevronDown } from "lucide-react";
import "./CareerGrowth.css";
import Topheader from "../../component/Topheader";

const CareerGrowth = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(70);
  const [milestoneData, setMilestoneData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [error, setError] = useState(null);
  const [showFocusAreas, setShowFocusAreas] = useState(true);
  const [showKeyActivities, setShowKeyActivities] = useState(true);
  const headerRef = useRef(null);
  const location = useLocation();

  const userId = location.state?.user;
  const userName = location.state?.userName;

  const programs = [
    { id: "TechVerse", icon: "🚀", label: "Tech Verse" },
    { id: "ProVision", icon: "👥", label: "Pro Vision" },
    { id: "BookVault", icon: "📚", label: "Book Vault" },
    { id: "SkillForge", icon: "⚒️", label: "Skill Forge" },
    { id: "EventPulse", icon: "🎯", label: "Event Pulse" },
    { id: "NetX", icon: "🌐", label: "Net X" },
  ];

  useEffect(() => {
    const fetchMilestoneData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/mileStone/getMileStones",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch milestone data");
        }

        const data = await response.json();
        setMilestoneData(data.data.milestones);
        setSelectedMilestone("Milestone 1");
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMilestoneData();
  }, [userId]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setEditedData({});
  }, [selectedMilestone, selectedProgram]);

  const handleFieldChange = (field, value, nestedField = null) => {
    setEditedData((prevState) => {
      const newState = { ...prevState };

      if (nestedField) {
        // Handle nested fields like Goals -> Primary Goal
        newState[field] = {
          ...(newState[field] || {}),
          [nestedField]: value,
        };
      } else {
        // Handle direct fields
        newState[field] = value;
      }

      return newState;
    });
  };

  const getCurrentMilestoneData = () => {
    const milestone = milestoneData[selectedMilestone];
    if (!selectedProgram) return milestone;
    return (
      milestone?.[selectedProgram] || {
        "What it Covers": "Coming soon",
        "Focus Areas": [],
        "Key Activities": [],
      }
    );
  };

  const getMergedData = () => {
    const currentData = getCurrentMilestoneData();

    if (!selectedProgram) {
      return {
        ...currentData,
        Timeline: {
          ...(currentData?.Timeline || {}),
          ...(editedData.Timeline || {}),
        },
        Goals: {
          ...(currentData?.Goals || {}),
          ...(editedData.Goals || {}),
          "Measurable Goals":
            editedData.MeasurableGoals ||
            currentData?.Goals?.["Measurable Goals"] ||
            [],
        },
      };
    }

    return {
      "What it Covers":
        editedData["What it Covers"] !== undefined
          ? editedData["What it Covers"]
          : currentData["What it Covers"],
      "Focus Areas":
        editedData["Focus Areas"] || currentData["Focus Areas"] || [],
      "Key Activities":
        editedData["Key Activities"] || currentData["Key Activities"] || [],
    };
  };

  const handleSave = () => {
    const confirmation = window.confirm(
      "Are you sure you want to update the roadmap for this user?"
    );

    if (confirmation) {
      const updatedData = {
        milestone: selectedMilestone,
        program: selectedProgram,
        changes: editedData,
      };

      console.log("Saving changes:", updatedData);
    }
  };

  const RenderProgramView = () => {
    const mergedData = getMergedData();

    return (
      <div className="content-body p-4">
        <div className="covers-section mb-6">
          <h4 className="section-header">What it Covers</h4>
          <textarea
            value={mergedData["What it Covers"]}
            onChange={(e) =>
              handleFieldChange("What it Covers", e.target.value)
            }
            rows={4}
            className="form-control"
          />
        </div>

        <div className="mb-6">
          <div
            className="section-header dropdown-header"
            onClick={() => setShowFocusAreas(!showFocusAreas)}
          >
            <h4>Focus Areas</h4>
            <ChevronDown
              size={18}
              strokeWidth={1.75}
              className={`dropdown-icon ${showFocusAreas ? "rotate" : ""}`}
            />
          </div>

          {showFocusAreas && (
            <div className="skills-section">
              {mergedData["Focus Areas"].map((area, idx) => (
                <div key={idx} className="skill-card">
                  <textarea
                    value={area}
                    onChange={(e) => {
                      const updatedFocusAreas = [...mergedData["Focus Areas"]];
                      updatedFocusAreas[idx] = e.target.value;
                      handleFieldChange("Focus Areas", updatedFocusAreas);
                    }}
                    className="form-control"
                  />
                </div>
              ))}
              <button
                className="btn btn-sm btn-outline-primary mt-2"
                onClick={() => {
                  const updatedFocusAreas = [...mergedData["Focus Areas"], ""];
                  handleFieldChange("Focus Areas", updatedFocusAreas);
                }}
              >
                Add Focus Area
              </button>
            </div>
          )}
        </div>

        <div className="mb-6">
          <div
            className="section-header dropdown-header"
            onClick={() => setShowKeyActivities(!showKeyActivities)}
          >
            <h4>Key Activities</h4>
            <ChevronDown
              size={18}
              strokeWidth={1.75}
              className={`dropdown-icon ${showKeyActivities ? "rotate" : ""}`}
            />
          </div>

          {showKeyActivities && (
            <div className="skills-section">
              {mergedData["Key Activities"].map((activity, idx) => (
                <div key={idx} className="skill-card">
                  <textarea
                    value={activity}
                    onChange={(e) => {
                      const updatedKeyActivities = [
                        ...mergedData["Key Activities"],
                      ];
                      updatedKeyActivities[idx] = e.target.value;
                      handleFieldChange("Key Activities", updatedKeyActivities);
                    }}
                    className="form-control"
                  />
                </div>
              ))}
              <button
                className="btn btn-sm btn-outline-primary mt-2"
                onClick={() => {
                  const updatedKeyActivities = [
                    ...mergedData["Key Activities"],
                    "",
                  ];
                  handleFieldChange("Key Activities", updatedKeyActivities);
                }}
              >
                Add Key Activity
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const RenderMilestoneView = () => {
    const mergedData = getMergedData();

    return (
      <div className="content-body p-4">
        <div className="timeline-section mb-6">
          <h4 className="section-header">Timeline</h4>
          <div className="row g-3">
            {Object.entries(mergedData?.Timeline || {}).map(([key, value]) => (
              <div className="col-md-4" key={key}>
                <div className="timeline-item">
                  <span className="timeline-label">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      handleFieldChange("Timeline", {
                        ...mergedData.Timeline,
                        [key]: e.target.value,
                      });
                    }}
                    className="form-control"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="goals-section">
          <h4 className="section-header">Goals</h4>
          <div className="primary-goal mb-4">
            <h5>Primary Goal</h5>
            <textarea
              value={mergedData?.Goals?.["Primary Goal"] || ""}
              onChange={(e) =>
                handleFieldChange("Goals", e.target.value, "Primary Goal")
              }
              className="form-control"
            />
          </div>
          <div className="measurable-goals">
            <h5>Measurable Goals</h5>
            <ul>
              {(mergedData?.Goals?.["Measurable Goals"] || []).map(
                (goal, idx) => (
                  <li key={idx}>
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => {
                        const updatedGoals = [
                          ...(mergedData?.Goals?.["Measurable Goals"] || []),
                        ];
                        updatedGoals[idx] = e.target.value;
                        handleFieldChange("MeasurableGoals", updatedGoals);
                      }}
                      className="form-control"
                    />
                  </li>
                )
              )}
            </ul>
            <button
              className="btn btn-sm btn-outline-primary mt-2"
              onClick={() => {
                const currentGoals =
                  mergedData?.Goals?.["Measurable Goals"] || [];
                const updatedGoals = [...currentGoals, ""];
                handleFieldChange("MeasurableGoals", updatedGoals);
              }}
            >
              Add Measurable Goal
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="main-wrapper">
      <Topheader />
      <div className="page-wrapper">
        {Object.keys(milestoneData).length === 0 ? (
          <div className="main-wrapper">
            <div className="page-wrapper">
              <div className="container mt-5">
                <h4>Career path for this user was not generated</h4>
              </div>
            </div>
          </div>
        ) : (
          <div className="career-dashboard">
            <div className="container-fluid px-4 py-10">
              <div className="row mb-3 align-items-center">
                <div className="col">
                  <h2 className="dashboard-title">{userName}'s Career Path</h2>
                </div>
                <div className="col-auto">
                  <div className="d-flex align-items-center gap-2">
                    <div className="btn-group view-toggle">
                      <button
                        className={`btn btn-sm btn-outline-primary ${
                          viewMode === "grid" ? "active" : ""
                        }`}
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid size={18} />
                      </button>
                      <button
                        className={`btn btn-sm btn-outline-primary ${
                          viewMode === "list" ? "active" : ""
                        }`}
                        onClick={() => setViewMode("list")}
                      >
                        <List size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                ref={headerRef}
                style={{ top: `${headerHeight}px` }}
                className={`milestone-container ${
                  isScrolled ? "scrolled" : ""
                }`}
              >
                <div className="milestone-buttons">
                  {Object.keys(milestoneData).map((milestone) => (
                    <button
                      key={milestone}
                      className={`milestone-btn ${
                        selectedMilestone === milestone ? "active" : ""
                      }`}
                      onClick={() => setSelectedMilestone(milestone)}
                    >
                      {milestone}
                    </button>
                  ))}
                </div>
              </div>

              <div className="row g-3">
                <div className="col-lg-3">
                  <div className="program-list">
                    {programs.map((program) => (
                      <button
                        key={program.id}
                        className={`program-item d-flex align-items-center gap-2 ${
                          selectedProgram === program.id ? "active" : ""
                        }`}
                        onClick={() => setSelectedProgram(program.id)}
                      >
                        <span className="program-icon">{program.icon}</span>
                        <span className="program-label">{program.label}</span>
                        <ChevronRight className="ms-auto" size={16} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="content-card">
                    <div className="content-header">
                      <h3 className="content-title">
                        {selectedProgram
                          ? `${selectedProgram} - ${selectedMilestone}`
                          : selectedMilestone}
                      </h3>
                    </div>

                    {selectedProgram
                      ? RenderProgramView()
                      : RenderMilestoneView()}

                    <div className="save-btn-container">
                      <button className="btn btn-primary" onClick={handleSave}>
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerGrowth;
