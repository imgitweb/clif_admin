import React, { useState, useRef } from "react";
import Topheader from "../../component/Topheader";
import axios from "axios";
import API_URL from "../../config";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../tosterNotification/tosters";

const AddBook = () => {
  const [formData, setFormData] = useState({
    bookName: "",
    bookAuthor: "",
    totalPages: "",
    bookType: "",
    bookDescription: "",
    bookTags: [],
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
    // If comma or space is pressed
    if ((e.key === "," || e.key === " ") && tagInput.trim() !== "") {
      e.preventDefault();
      addTag(tagInput.trim());
    }
    // If Enter is pressed
    else if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      addTag(tagInput.trim());
    }
    // If Backspace is pressed and input is empty, remove the last tag
    else if (
      e.key === "Backspace" &&
      tagInput === "" &&
      formData.bookTags.length > 0
    ) {
      const newTags = [...formData.bookTags];
      newTags.pop();
      setFormData({
        ...formData,
        bookTags: newTags,
      });
    }
  };

  // Add a tag to the tags array
  const addTag = (tag) => {
    if (tag !== "" && !formData.bookTags.includes(tag)) {
      setFormData({
        ...formData,
        bookTags: [...formData.bookTags, tag],
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
      bookTags: formData.bookTags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleFileChange = (e) => {
    console.log("File:", e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        bookFile: file,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Book Data to Submit:", formData);
    const response = await axios.post(
      `${API_URL}/admin/books/add-book`,
      formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response) {
      ErrorNotification("Something went wrong");
    } else {
      SuccessNotification("Book added successfully");
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
      if (!formData.bookTags.includes(tag.trim())) {
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
                    <h4 className="fw-semibold mb-8">Add Book</h4>
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
                          Book
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                          Add Book
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
                    <h1 className="mb-4">Add Book</h1>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="book_file">
                          File
                        </label>
                        <input
                          type="file"
                          id="bookFile"
                          name="bookFile"
                          onChange={handleFileChange}
                          value={formData.book_file}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="bookTags" className="form-label">
                          Book Tags*
                        </label>
                        <div className="tags-input-container">
                          <div className="input-group">
                            {/* Tags display */}
                            <div className="form-control d-flex flex-wrap gap-2 min-h-100">
                              {formData.bookTags.map((tag, index) => (
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
                                  formData.bookTags.length === 0
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
                          {/* <small className="form-text text-muted">
                          Press space, comma, or Enter to add tags. Press
                          Backspace to remove the last tag.
                        </small> */}
                        </div>
                      </div>
                    </div>
                    {/* Book Name */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="bookName" className="form-label">
                          Book Name*
                        </label>
                        <input
                          type="text"
                          placeholder="Enter book name"
                          className="form-control"
                          id="bookName"
                          name="bookName"
                          value={formData.bookName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="bookAuthor" className="form-label">
                          Book Author*
                        </label>
                        <input
                          type="text"
                          placeholder="Enter author name"
                          className="form-control"
                          id="bookAuthor"
                          name="bookAuthor"
                          value={formData.bookAuthor}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Total Pages */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="totalPages" className="form-label">
                          Total Pages*
                        </label>
                        <input
                          type="number"
                          placeholder="Enter total pages"
                          className="form-control"
                          id="totalPages"
                          name="totalPages"
                          value={formData.totalPages}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="bookType" className="form-label">
                          Book Type*
                        </label>
                        <select
                          id="bookType"
                          name="bookType"
                          className="form-control"
                          value={formData.bookType}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="" hidden>
                            Select Book Type
                          </option>
                          <option value="Technical">Technical</option>
                          <option value="Non-Technical">Non-Technical</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label htmlFor="bookDescription" className="form-label">
                          Book Description*
                        </label>
                        <textarea
                          className="form-control"
                          placeholder="Enter book description"
                          id="bookDescription"
                          name="bookDescription"
                          value={formData.bookDescription}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                    {/* Submit Button */}
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary w-100">
                        Add Book
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

export default AddBook;
