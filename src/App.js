import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import AddMentor from "./pages/mentor/Add_Mentor";
import MentorList from "./pages/mentor/Mentor_list";
import AddBook from "./pages/books/AddBook";
import BooksList from "./pages/books/BooksList";
import UsersList from "./pages/users/UserList";
import CareerGrowth from "./pages/careerGrowth/CareerGrowth";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import AddEvent from "./pages/events/AddEvent";
import EventList from "./pages/events/EventList";
import AddCertificates from "./pages/certificates/AddCertificates";
import CertificateList from "./pages/certificates/ListCertificates";
import PDFViewer from "./pages/books/PdfViewer";
import FrontendLogs from "./pages/users/Frontendlogs";
import VisitorLogs from "./pages/users/VisitorLogs";
import UserActivity from "./pages/users/UserActivity";
import AddTemplate from "./pages/templates/Addtemplates";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-mentor" element={<AddMentor />} />
        <Route path="/mentor-list" element={<MentorList />} />

        {/* Books Routes */}
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/books-list" element={<BooksList />} />
        <Route path="/read-book" element={<PDFViewer />} />

 {/* template Routes */}
        <Route path="/add-templates" element={<AddTemplate />} />

        {/* user list */}
        <Route path="/users-list" element={<UsersList />} />
        <Route path="/users-list" element={<UsersList />} />
        {/* career growth */}
        <Route path="/frontend-logs" element={<FrontendLogs />} />
        <Route path="/visiter-logs" element={<VisitorLogs />} />
        <Route path="/activity-logs" element={<UserActivity />} />

        {/* event route */}
        <Route path="/add-events" element={<AddEvent />} />
        <Route path="/events-list" element={<EventList />} />

        {/* Certificate route */}
        <Route path="/add-certificate" element={<AddCertificates />} />
        <Route path="/certificates-list" element={<CertificateList />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
