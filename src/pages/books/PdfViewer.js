import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
// import { GlobalWorkerOptions } from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = ({ pdfUrl }) => {
  console.log(pdfUrl);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  //   useEffect(() => {
  //     // Use the worker file path from node_modules
  //     pdfjs.GlobalWorkerOptions.workerSrc =
  //       `http://localhost:3000/pdf.worker.min.js`;
  //   }, []);
  // Handle when the document is loaded
  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Handle page navigation
  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-center m-3">
        <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div className="btn-group">
          <button
            className="btn btn-secondary"
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
          >
            Previous
          </button>
          <span className="d-flex align-items-center px-3">
            Page {pageNumber} of {numPages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
