import { useEffect, useState } from "react";
import Topheader from "../../component/Topheader";
import axios from "axios";
import API_URL from "../../config";

const ListTemplates = () => {
  const [allTemplates, setTemplateList] = useState([]);

  useEffect(() => {
    fetchTemplateList();
  }, []);

  const fetchTemplateList = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/resume-templates`);
      if (response.status === 200) {
        console.log("Fetched Templates:", response.data);
        setTemplateList(response.data.reverse());
      }
    } catch (error) {
      console.error("Error fetching templates", error);
    }
  };
  const HandleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/admin/resume-template/${id}`
      );
      if (response.status === 200) {
        alert("Template deleted successfully");
        fetchTemplateList(); 
      }
    } catch (error) {
      console.error("Error deleting template", error);
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <Topheader />
        <div className="page-wrapper mt-5">
          <div className="container-fluid">
            <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
              <div className="card-body px-4 py-3">
                <div className="row align-items-center">
                  <div className="col-9">
                    <h4 className="fw-semibold mb-8">Resume Templates List</h4>
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
                          Templates
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                          Resume Templates List
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

            {/* Table */}
            <div className="row">
              <div className="col-md-6 col-lg-12 justify-content-center mx-auto">
                <div className="card shadow-sm">
                  <div className="container py-5">
                    <h1 className="mb-4">Templates List</h1>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Columns</th>
                            <th>headShot</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allTemplates.map((template) => (
                            <tr key={template._id}>
                              <td style={{ textTransform: "capitalize" }}>
                                {template.name}
                              </td>
                              <td style={{ textTransform: "capitalize" }}>
                                {template.category}
                              </td>
                              <td style={{ textTransform: "capitalize" }}>
                                {template.columns}
                              </td>
                               <td style={{ textTransform: "capitalize" }}>
                                {template.headShot ? "Yes" : "No"}
                              </td>
                             
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    HandleDelete(template._id);
                                  }}
                                >
                                  <i className="ti ti-trash"></i> Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {allTemplates.length === 0 && (
                        <p className="text-center my-3">No templates found.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Table */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListTemplates;
