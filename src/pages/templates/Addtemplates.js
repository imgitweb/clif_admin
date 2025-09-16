import React, { useState } from "react";
import Topheader from "../../component/Topheader";
import axios from "axios";
import API_URL from "../../config";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../tosterNotification/tosters";
import { useNavigate } from "react-router-dom";

const AddTemplate = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    color: "",
    description: "",
    headShot: false,
    columns: 1,
  });
  const [templateFile, setTemplateFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigation = useNavigate();

  // Handle text input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle file changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "templateFile") {
      setTemplateFile(files[0]);
    } else if (name === "previewImage") {
      setPreviewImage(files[0]);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      if (templateFile) submitData.append("templateFile", templateFile);
      if (previewImage) submitData.append("previewImage", previewImage);

      const response = await axios.post(
        `${API_URL}/api/admin/resume-template`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      SuccessNotification("Template added successfully");
      setFormData({
        name: "",
        category: "",
        color: "",
        description: "",
        headShot: false,
        columns: 1,
      });
      setTemplateFile(null);
      setPreviewImage(null);
      // navigation("/templates-list");
    } catch (error) {
      console.error(error);
      ErrorNotification(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="main-wrapper">
      <Topheader />
      <div className="page-wrapper mt-4">
        <div className="container-fluid">
          <div className="card shadow-sm">
            <div className="container py-5">
              <h1 className="mb-4">Add Resume Template</h1>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  {/* Name */}
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Template Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="col-md-6">
                    <label htmlFor="category" className="form-label">
                      Category*
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      className="form-control"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  {/* Color */}
                  <div className="col-md-6">
                    <label htmlFor="color" className="form-label">
                      Color*
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      className="form-control"
                      value={formData.color}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Columns */}
                  <div className="col-md-6">
                    <label htmlFor="columns" className="form-label">
                      Columns*
                    </label>
                    <select
                      id="columns"
                      name="columns"
                      className="form-control"
                      value={formData.columns}
                      onChange={handleInputChange}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                    </select>
                  </div>
                </div>

                {/* Description (full row) */}
                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="description" className="form-label">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  {/* Template File */}
                  <div className="col-md-6">
                    <label htmlFor="templateFile" className="form-label">
                      Template File*
                    </label>
                    <input
                      type="file"
                      id="templateFile"
                      name="templateFile"
                      className="form-control"
                      onChange={handleFileChange}
                      required
                    />
                  </div>

                  {/* Preview Image */}
                  <div className="col-md-6">
                    <label htmlFor="previewImage" className="form-label">
                      Preview Image*
                    </label>
                    <input
                      type="file"
                      id="previewImage"
                      name="previewImage"
                      className="form-control"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                </div>

                {/* Headshot (full row checkbox) */}
                <div className="row mb-3">
                  <div className="col-12 form-check">
                    <input
                      type="checkbox"
                      id="headShot"
                      name="headShot"
                      className="form-check-input"
                      checked={formData.headShot}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="headShot" className="form-check-label ms-2">
                      Include HeadShot
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-100">
                  Add Template
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTemplate;
