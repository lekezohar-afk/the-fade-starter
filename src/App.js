// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SubmitPage from "./components/SubmitPage";
import AllShopsPage from "./components/AllShopsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/shops" element={<AllShopsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
