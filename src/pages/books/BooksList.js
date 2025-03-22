import { useEffect, useState } from "react";
import Topheader from "../../component/Topheader";
import axios from "axios";
import API_URL from "../../config";

// Add the PDF viewer component
import PDFViewer from "./PdfViewer";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../tosterNotification/tosters";

const BooksList = () => {
  const [allBooks, setBookList] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "book_name", // Default sort by book title
    direction: "asc", // Default sort order is ascending
  });

  useEffect(() => {
    fetchBookList();
  }, []);

  const fetchBookList = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/books/books-list`);
      if (response.status === 200) {
        console.log(response.data.data);
        setBookList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleReadPDF = (pdfUrl) => {
    console.log(pdfUrl);
    setSelectedPDF(`${API_URL}/uploads/${pdfUrl}`);
    const modal = new window.bootstrap.Modal(
      document.getElementById("pdfModal")
    );
    modal.show();
  };

  const handleDelete = async (id) => {
    try {
      axios
        .post(
          `${API_URL}/admin/books/delete-book`,
          { id: id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          SuccessNotification("Book Deleted Successfully!");
          fetchBookList();
        });
    } catch (error) {
      ErrorNotification("Something went wrong!");
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"; // Toggle sorting direction if same column is clicked
    }

    setSortConfig({ key, direction });

    const sortedBooks = [...allBooks].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setBookList(sortedBooks);
  };

  const handleSortingIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "↑" : "↓";
    }
    return "";
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
                      <h4 className="fw-semibold mb-8">Book List</h4>
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
                            Books
                          </li>
                          <li className="breadcrumb-item" aria-current="page">
                            Book List
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
                      <h1 className="mb-4">Books List</h1>
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th
                                style={{ cursor: "pointer" }}
                                onClick={() => handleSort("book_name")}
                              >
                                Title {handleSortingIcon("book_name")}
                              </th>
                              <th
                                style={{ cursor: "pointer" }}
                                onClick={() => handleSort("book_type")}
                              >
                                Book Type {handleSortingIcon("book_type")}
                              </th> 
                              <th
                                style={{ cursor: "pointer" }}
                                onClick={() => handleSort("book_author")}
                              >
                                Book Author {handleSortingIcon("book_author")}
                              </th>
                              <th>BookTags</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allBooks.map((book) => {
                              return (
                                <tr key={book._id}>
                                  <td style={{ textTransform: "capitalize" }}>
                                    {book.book_name}
                                  </td>
                                  <td style={{ textTransform: "capitalize" }}>
                                    {book.book_type}
                                  </td>
                                  <td style={{ textTransform: "capitalize" }}>
                                    {book.book_author}
                                  </td>
                                  <td>
                                    {book.book_tags.map((tag, index) => (
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
                                    ))}
                                  </td>
                                  <td className="d-flex gap-2">
                                    <button
                                      className="btn btn-info"
                                      onClick={() =>
                                        handleReadPDF(book.book_file)
                                      }
                                    >
                                      <i className="ti ti-book"></i> Read PDF
                                    </button>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => {
                                        handleDelete(book._id);
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

      {/* PDF Modal */}
      <div
        className="modal fade"
        id="pdfModal"
        tabIndex="-1"
        aria-labelledby="pdfModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="pdfModalLabel">
                PDF Viewer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedPDF && <PDFViewer pdfUrl={selectedPDF} />}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BooksList;
