import React, { useState, useEffect } from "react";

const EditMentor = ({ mentor, onClose }) => {

  // State to manage the mentor data
  const [mentorData, setMentorData] = useState(mentor);

  useEffect(() => {
    // Initialize mentor data state when component mounts
    setMentorData(mentor);
  }, [mentor]);

  // Handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMentorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save updated data (you can handle onSave function to send the data somewhere)
    // onSave(mentorData);
    console.log(onClose);
  };

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
              <h5 className="modal-title">Update Mentor Profile</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              {/* <form onSubmit={handleSubmit}> */}
              <div className="row">
                <div className="col-md-4 text-center">
                  <div
                    className="rounded-circle bg-light p-4 mx-auto mb-3"
                    style={{ width: "fit-content", borderRadius: "50%" }}
                  >
                    <img
                      src={mentor.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <h4>
                    <input
                      type="text"
                      name="name"
                      value={mentorData.name}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Name"
                    />
                  </h4>
                  <p className="text-muted">
                    <input
                      type="text"
                      name="expertise"
                      value={mentorData.expertise}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Expertise"
                    />
                  </p>
                  <div className="mb-3">
                    <span className="badge bg-success fs-2 me-2">
                      <i className="ti ti-star me-1" />
                      <input
                        type="number"
                        name="rating"
                        value={mentorData.rating}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Rating"
                        min="1"
                        max="5"
                      />
                    </span>
                    <span className="badge bg-primary fs-2">
                      <i className="ti ti-users me-1" />
                      <input
                        type="number"
                        name="totalMentees"
                        value={mentorData.totalMentees}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Mentees Count"
                      />
                    </span>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="mb-4">
                    <h6 className="fw-bold">About</h6>
                    <textarea
                      name="description"
                      value={mentorData.description}
                      onChange={handleInputChange}
                      className="form-control"
                      rows="3"
                      placeholder="About the mentor"
                    />
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-bold">Education</h6>
                    <input
                      type="text"
                      name="education"
                      value={mentorData.education}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Education"
                    />
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-bold">Experience</h6>
                    <textarea
                      name="experience"
                      value={mentorData.experience}
                      onChange={handleInputChange}
                      className="form-control"
                      rows="3"
                      placeholder="Experience"
                    />
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-bold">Skills</h6>
                    <input
                      type="text"
                      name="skills"
                      // value={mentorData.skills.join(", ")}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Skills (comma-separated)"
                    />
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-bold">Languages</h6>
                    <input
                      type="text"
                      name="languages"
                      // value={mentorData.languages.join(", ")}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Languages (comma-separated)"
                    />
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-bold">Availability</h6>
                    <input
                      type="text"
                      name="availability"
                      value={mentorData.availability}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Availability"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMentor;
