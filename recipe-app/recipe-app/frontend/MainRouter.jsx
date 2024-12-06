import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeListPage from "./pages/RecipeListPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import EditRecipePage from "./pages/EditRecipePage"; // Import the EditRecipePage
import HomePage from "./pages/HomePage"; // Import the HomePage
import LoginPage from "./pages/LoginPage";

const MainRouter = () => {
    return (
        <Router>
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

export default MainRouter;
