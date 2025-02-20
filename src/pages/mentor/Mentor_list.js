import React, { useEffect, useRef, useState } from "react";
import Topheader from "../../component/Topheader";
import ViewMentor from "./ViewMentor"; // Import the ViewMentor component
import EditMentor from "./EditMentorData";
import axios from "axios";

import API_URL from "../../config";

const MentorList = () => {
  // console.log("api",API_URL)
  const [sortedMentors, setSortedMentors] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [viewDetail, setViewDetail] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [editMentor, setEditMentor] = useState(false);
  const [categories, setCategories] = useState([
    "Technical",
    "Non Technical",
    "Subject Expert",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(""); // initially empty to show all mentors

  // useEffect to handle category change and fetch mentors
  useEffect(() => {
    fetchMentors(selectedCategory); // Fetch mentors based on the selected category
  }, [selectedCategory]); // Dependency on selectedCategory

  // Fetch mentors based on category (or all if no category selected)
  const fetchMentors = async (category) => {
    try {
      let url = `${API_URL}/admin/api/mentors/get-mentor`; // Default URL for all mentors
      if (category) {
        const encodedCategory = encodeURIComponent(category); // Ensure the category is URL encoded
        url += `?category=${encodedCategory}`; // Append category to URL
      }
      const response = await axios.get(url);
      setSortedMentors(response.data.data);
    } catch (error) {
      console.log("Failed to fetch mentors", error);
      if (error.response && error.response.status === 404) {
        alert("No mentors found");
      } else {
        alert("Failed to fetch");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`${API_URL}/api/mentors/delete-mentor`, {
        mentorID: id,
      });
      fetchMentors(selectedCategory); // Re-fetch mentors after deletion
      alert("Mentor Deleted");
    } catch (error) {
      console.log("Failed to delete mentor", error);
      alert("Failed to delete");
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sorted = [...sortedMentors].sort((a, b) => {
      if (a[key].toLowerCase() < b[key].toLowerCase()) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key].toLowerCase() > b[key].toLowerCase()) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortedMentors(sorted);
  };

  const handleSortingIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "↑" : "↓";
    }
    return "";
  };

  const handleViewDetails = (mentor) => {
    setViewDetail(true);
    setSelectedMentor(mentor);
  };

  const closeModal = () => {
    setViewDetail(false);
    setSelectedMentor(null);
  };

  const handleEdit = (mentor) => {
    setEditMentor(true);
    setSelectedMentor(mentor);
  };

  const closeEditModal = () => {
    setEditMentor(false);
    setSelectedMentor(null);
    fetchMentors(selectedCategory); // Re-fetch mentors after editing
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory); // Update the selectedCategory state
  };

  return (
    <>
      <div className="main-wrapper">
        <Topheader />
        <div className="page-wrapper pt-5">
          <div className="container-fluid">
            <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
              <div className="card-body px-4 py-3">
                <div className="row align-items-center pt-5">
                  <div className="col-9">
                    <h4 className="fw-semibold mb-8">Mentor List</h4>
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
                          Mentor
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                          Mentor List
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

            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Mentor List
                </h6>
              </div>
              <div className="card-body justify-content-space-between">
                <div className="d-flex justify-content-end mb-3">
                  <label htmlFor="categorySearch" className="form-label me-2 ">
                    Search by Category
                  </label>
                  <select
                    id="categorySearch"
                    className="form-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="" hidden>
                      Select Category
                    </option>
                    <option value="">All</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.toLocaleLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th
                          scope="col"
                          onClick={() => handleSort("name")}
                          style={{ cursor: "pointer" }}
                        >
                          Name {handleSortingIcon("name")}
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("category")}
                          style={{ cursor: "pointer" }}
                        >
                          Category {handleSortingIcon("category")}
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("designation")}
                          style={{ cursor: "pointer" }}
                        >
                          Designation {handleSortingIcon("designation")}
                        </th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedMentors.map((mentor) => (
                        <tr key={mentor._id}>
                          <td onClick={() => handleViewDetails(mentor)}>
                            <img
                              src={`http://localhost:5000${mentor.image}`}
                              alt={mentor.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          </td>
                          <td onClick={() => handleViewDetails(mentor)}>
                            {mentor.name}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {mentor.category}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {mentor.designation}
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm me-2"
                              onClick={() => handleEdit(mentor)}
                            >
                              <i className="ti ti-pencil"></i> Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(mentor._id)}
                            >
                              <i className="ti ti-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="justify-content-center">
        {viewDetail && selectedMentor && (
          <ViewMentor mentor={selectedMentor} onClose={closeModal} />
        )}
      </div>
      <div className="m-4">
        {editMentor && selectedMentor && (
          <EditMentor mentor={selectedMentor} onClose={closeEditModal} />
        )}
      </div>
    </>
  );
};

export default MentorList;
