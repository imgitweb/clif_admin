import { useEffect, useState } from "react";
import Topheader from "../../component/Topheader";
import axios from "axios";
import API_URL from "../../config";

const CertificateList = () => {
  const [allCertificates, setCertificateList] = useState([]); // Renamed to 'allCertificates'
  const [selectedPDF, setSelectedPDF] = useState(null); // Manage selected PDF URL

  useEffect(() => {
    fetchCertificateList();
  }, []);

  const fetchCertificateList = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/admin/certificates/get-certificates`
      );
      if (response.status === 200) {
        console.log(response.data.data);
        setCertificateList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching certificates", error);
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
                      <h4 className="fw-semibold mb-8">Certificate List</h4>{" "}
                      {/* Update title */}
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
                            Certificates{" "}
                            {/* Change breadcrumb to Certificates */}
                          </li>
                          <li className="breadcrumb-item" aria-current="page">
                            Certificate List
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
                <div className="col-md-6 col-lg-12 justify-content-center mx-auto">
                  <div className="card shadow-sm">
                    <div className="container py-5">
                      <h1 className="mb-4">Certificates List</h1>{" "}
                      {/* Update heading */}
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Certificate Type</th>{" "}
                              {/* Update column to Certificate Type */}
                              <th>Provider</th>{" "}
                              {/* Update column to Certificate Author */}
                              <th>Certificate Tags</th>{" "}
                              {/* Update column to Certificate Tags */}
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allCertificates.map((certificate) => {
                              // Updated to certificates
                              return (
                                <tr key={certificate._id}>
                                  <td style={{ textTransform: "capitalize" }}>
                                    {certificate.certificate_name}{" "}
                                    {/* Update to certificate_name */}
                                  </td>
                                  <td style={{ textTransform: "capitalize" }}>
                                    {certificate.certificate_type}{" "}
                                    {/* Update to certificate_type */}
                                  </td>
                                  <td style={{ textTransform: "capitalize" }}>
                                    {certificate.certificate_provider}{" "}
                                    {/* Update to certificate_author */}
                                  </td>
                                  <td>
                                    {certificate.certificate_tags.map(
                                      (
                                        tag,
                                        index // Update to certificate_tags
                                      ) => (
                                        <span
                                          key={index}
                                          style={{
                                            textTransform: "capitalize",
                                            marginRight: "5px",
                                          }}
                                        >
                                          <i className="ti ti-tag"></i>
                                          {tag}
                                        </span>
                                      )
                                    )}
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => {
                                        console.log("Delete Certificate"); // Update delete text
                                      }}
                                    >
                                      <i className="ti ti-trash"></i> Delete
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {selectedPDF && <PDFViewer pdfUrl={selectedPDF} />} */}
    </>
  );
};

export default CertificateList;
