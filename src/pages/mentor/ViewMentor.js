import React from "react";
import API_URL from "../../config";
const ViewMentor = ({ mentor, onClose }) => {
  // console.log("mentor", mentor);
  // const skills = mentor.skills.split(",");
  // const languages = mentor.languages.split(",");
  return (
    <>
      <div
        className="modal fade show"
        style={{
          display: "block",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1050,
        }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Mentor Profile</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4 text-center">
                  <div
                    className="rounded-circle bg-light p-4 mx-auto mb-3"
                    style={{
                      width: "150px", // or any fixed size for a circular shape
                      height: "150px", // matching height and width
                      display: "flex", // to center the image inside
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden", // ensure the image doesn't overflow the circle
                    }}
                  >
                    <img
                      src={`${API_URL}${mentor.image}`}
                      alt={mentor.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // ensures the image covers the area without stretching
                        borderRadius: "50%", // makes the image circular
                      }}
                    />
                  </div>
                  <h4>{mentor.name}</h4>
                  <p className="text-muted">{mentor.expertise}</p>
                  <div className="mb-3">
                    <span className="badge bg-success fs-2 me-2">
                      <i className="ti ti-star me-1" />
                      {mentor.rating}
                    </span>
                    {/* <span className="badge bg-primary fs-2">
                      <i className="ti ti-users me-1" />
                      {mentor.totalMentees} mentees
                    </span> */}
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="mb-4">
                    <h6 className="fw-bold">About</h6>
                    <p>{mentor.aboutUs}</p>
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-bold">Education</h6>
                    <p>{mentor.higherEducation}</p>
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-bold">Experience</h6>
                    <p>{mentor.totalExp}</p>
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-bold">Skills</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {mentor.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="badge bg-light-subtle text-dark"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-bold">Languages</h6>
                    <div className="d-flex gap-2">
                      {mentor.languages.map((language, index) => (
                        <span
                          key={index}
                          className="badge bg-info-subtle text-dark"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-bold">Availability</h6>
                    <p>{mentor.availableTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade hide"></div>
      </div>
    </>
  );
};

export default ViewMentor;
