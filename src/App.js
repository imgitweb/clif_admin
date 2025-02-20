import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import AddMentor from "./pages/mentor/Add_Mentor";
import MentorList from "./pages/mentor/Mentor_list";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-mentor" element={<AddMentor />} />
        <Route path="/mentor-list" element={<MentorList />} />
      </Routes>
    </Router>
  );
}

export default App;
