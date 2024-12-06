import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Ensure Navbar exists and path is correct
import HomePage from "./pages/HomePage"; // Home Page Component
import LoginPage from "./pages/LoginPage"; // Login Page Component
import RecipeListPage from "./pages/RecipeListPage"; // Recipe List Page Component
import CreateRecipePage from "./pages/CreateRecipePage"; // Create Recipe Page Component
import EditRecipePage from "./pages/EditRecipePage"; // Edit Recipe Page Component
import './App.css'; // Optional global styles

const App = () => {
  return (
    <Router>
      {/* Adding Navbar globally so it appears on all pages */}
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/recipes" element={<RecipeListPage />} />
        <Route path="/create-recipe" element={<CreateRecipePage />} />
        <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
      </Routes>
    </Router>
  );
};

export default App;
