import React, { useState, useRef } from "react";
import Topheader from "../../component/Topheader";
import axios from "axios";
import API_URL from "../../config";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../tosterNotification/tosters";

const AddCertificates = () => {
  const [formData, setFormData] = useState({
    c_name: "",
    C_Tags: [],
    c_provider: "",
    c_link: "",
    totalDuration: "",
    c_type: "",
    c_description: "",
  });
  const [tagInput, setTagInput] = useState("");
  const tagInputRef = useRef(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle tag input change
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // Add a tag when comma or space is pressed
  const handleTagKeyDown = (e) => {
    if ((e.key === "," || e.key === " ") && tagInput.trim() !== "") {
      e.preventDefault();
      addTag(tagInput.trim());
    } else if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      addTag(tagInput.trim());
    } else if (
      e.key === "Backspace" &&
      tagInput === "" &&
      formData.C_Tags.length > 0
    ) {
      const newTags = [...formData.C_Tags];
      newTags.pop();
      setFormData({
        ...formData,
        C_Tags: newTags,
      });
    }
  };

  // Add a tag to the tags array
  const addTag = (tag) => {
    if (tag !== "" && !formData.C_Tags.includes(tag)) {
      setFormData({
        ...formData,
        C_Tags: [...formData.C_Tags, tag],
      });
      setTagInput("");
    }
  };

  // Process any pending tag when focus leaves the input
  const handleTagInputBlur = () => {
    if (tagInput.trim() !== "") {
      addTag(tagInput.trim());
    }
  };

  // Remove a tag from the tags array
  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      C_Tags: formData.C_Tags.filter((tag) => tag !== tagToRemove),
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Certificate Data to Submit:", formData)
    if(formData){
      SuccessNotification("Certificate added successfully");
    }

    try {
      const response = await axios.post(
        `${API_URL}/admin/certificates/add-certificate`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        SuccessNotification("Certificate added successfully");
      } else {
        ErrorNotification("Something went wrong");
      }
    } catch (error) {
      ErrorNotification("Something went wrong");
      console.error("Error adding certificate:", error);
    }
  };

  // Handle pasting multiple tags
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");

    // Split pasted text by commas or spaces
    const tags = pastedText.split(/[,\s]+/).filter((tag) => tag.trim() !== "");

    // Add each tag
    tags.forEach((tag) => {
      if (!formData.C_Tags.includes(tag.trim())) {
        addTag(tag.trim());
      }
    });
  };

  return (
    <div className="main-wrapper">
      <Topheader />
      <div className="">
        <div className="page-wrapper mt-4">
          <div className="container-fluid">
            <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
              <div className="card-body px-4 py-3">
                <div className="row align-items-center">
                  <div className="col-9">
                    <h4 className="fw-semibold mb-8">Add Certificate</h4>
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
                          Certificates
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                          Add Certificate
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
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 col-lg-8 justify-content-center mx-auto">
                <div className="card shadow-sm">
                  <div className="container py-5">
                    <h1 className="mb-4">Add Certificate</h1>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="c_name">
                          Certificate Name*
                        </label>
                        <input
                          type="text"
                          id="c_name"
                          name="c_name"
                          onChange={handleInputChange}
                          value={formData.c_name}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="C_Tags" className="form-label">
                          Certificate Tags*
                        </label>
                        <div className="tags-input-container">
                          <div className="input-group">
                            <div className="form-control d-flex flex-wrap gap-2 min-h-100">
                              {formData.C_Tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="badge bg-primary d-flex align-items-center"
                                  style={{
                                    fontSize: "0.9rem",
                                    padding: "0.5rem",
                                    marginBottom: "0.2rem",
                                  }}
                                >
                                  {tag}
                                  <span
                                    className="ms-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => removeTag(tag)}
                                  >
                                    &times;
                                  </span>
                                </span>
                              ))}
                              <input
                                type="text"
                                ref={tagInputRef}
                                value={tagInput}
                                onChange={handleTagInputChange}
                                onKeyDown={handleTagKeyDown}
                                onBlur={handleTagInputBlur}
                                onPaste={handlePaste}
                                className="border-0 flex-grow-1 min-width-50"
                                placeholder={
                                  formData.C_Tags.length === 0
                                    ? "Type and press space or comma to add tags"
                                    : ""
                                }
                                style={{
                                  outline: "none",
                                  width: "auto",
                                  backgroundColor: "transparent",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="c_provider">
                          Certificate Provider*
                        </label>
                        <select
                          className="form-control"
                          required
                          name="c_provider"
                          id="c_provider"
                          onChange={handleInputChange}
                          value={formData.c_provider}
                        >
                          <option hidden value={""}>
                            Select Certificate Provider
                          </option>
                          <option value={"google"}>Google</option>
                          <option value={"amazon"}>Amazon</option>
                          <option value={"microsoft"}>Microsoft</option>
                          <option value={"meta"}>Meta</option>
                          <option value={"facebook"}>Facebook</option>
                          <option value={"other"}>Other</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="c_link">
                          Certificate Link*
                        </label>
                        <input
                          type="url"
                          required
                          className="form-control"
                          placeholder="Certificate Link"
                          name="c_link"
                          id="c_link"
                          value={formData.c_link}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="totalDuration" className="form-label">
                          Total Duration(months)*
                        </label>
                        <input
                          type="number"
                          placeholder="Enter total duration"
                          className="form-control"
                          id="totalDuration"
                          name="totalDuration"
                          value={formData.totalDuration}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="c_type" className="form-label">
                          Certificate Type*
                        </label>
                        <select
                          id="c_type"
                          name="c_type"
                          className="form-control"
                          value={formData.c_type}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="" hidden>
                            Select Certificate Type
                          </option>
                          <option value="technical">Technical</option>
                          <option value="non-technical">Non-Technical</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label
                          htmlFor="c_description"
                          className="form-label"
                        >
                          Certificate Description*
                        </label>
                        <textarea
                          className="form-control"
                          placeholder="Enter certificate description"
                          id="c_description"
                          name="c_description"
                          value={formData.c_description}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                    {/* Submit Button */}
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary w-100">
                        Add Certificate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCertificates;
