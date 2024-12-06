import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p>{recipe.ingredients}</p>
      <Link to={`/recipes/${recipe._id}`}>Edit</Link>
    </div>
  );
};

export default RecipeCard;
