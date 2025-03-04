import { useState } from "react";
import Topheader from "../../component/Topheader";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../tosterNotification/tosters";
import axios from "axios";
import API_URL from "../../config";

const AddEvent = () => {
  const [formData, setFormData] = useState({});

  // handling input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handling file change
  const handleFileChange = (e) => {
    const logo = e.target.files[0];
    if (logo) {
      setFormData((prev) => ({
        ...prev,
        event_logo: logo,
      }));
    }
  };

  // handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data", formData);
    try {
      const response = await axios.post(
        `${API_URL}/admin/event/add-event`,
        formData
      );
      if (!response) {
        throw new Error("Something went wrong");
      } else {
        SuccessNotification("Event added successfully");
      }
    } catch (error) {
      console.log("Error:", error);
      ErrorNotification(error.message);
    }
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
                      <h4 className="fw-semibold mb-8">Add Event</h4>
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <a
                              className="text-muted text-decoration-none"
                              href="../dark/index.html"
                            >
                              Home
                            </a>
                          </li>
                          <li className="breadcrumb-item" aria-current="page">
                            Event
                          </li>
                          <li className="breadcrumb-item" aria-current="page">
                            Add Event
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
                <div className="col-md-6 col-lg-8 justify-content-center mx-auto">
                  <div className="card shadow-sm">
                    <div className="container py-5">
                      <h1 className="mb-4">Add Events</h1>
                      <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                          {/* <div className="col-md-6">
                            <label htmlFor="event_logo" className="form-label">
                              Event Logo*
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              id="event_logo"
                              onChange={handleFileChange} // fixed this here
                              required
                            />
                          </div> */}
                          <div className="col-md-12">
                            <label htmlFor="title" className="form-label">
                              Event Name*
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="title"
                              name="title" // added name to match state key
                              onChange={handleInputChange} // fixed this here
                              required
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label htmlFor="link" className="form-label">
                              Event Link*
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="link"
                              name="link" // added name to match state key
                              onChange={handleInputChange} // fixed this here
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="type" className="form-label">
                              Event Type*
                            </label>
                            <select
                              className="form-control"
                              name="type" // added name to match state key
                              id="type"
                              onChange={handleInputChange} // fixed this here
                            >
                              <option hidden>Select Event Type</option>
                              <option value={"webinar"}>Webinar</option>
                              <option value={"meeting"}>Meeting</option>
                              <option value={"other"}>Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label htmlFor="date" className="form-label">
                              Event Date*
                            </label>
                            <input
                              type="date"
                              name="date" // added name to match state key
                              id="date"
                              className="form-control"
                              onChange={handleInputChange} // fixed this here
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="time" className="form-label">
                              Event Time*
                            </label>
                            <input
                              type="time"
                              name="time" // added name to match state key
                              id="time"
                              className="form-control"
                              onChange={handleInputChange} // fixed this here
                              required
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div>
                            <label htmlFor="description" className="form-label">
                              Event Description
                            </label>
                            <textarea
                              className="form-control"
                              id="description"
                              rows="3"
                              name="description" // added name to match state key
                              onChange={handleInputChange} // fixed this here
                            ></textarea>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-primary">
                              Add Event
                            </button>
                          </div>
                        </div>
                      </form>
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

export default AddEvent;
