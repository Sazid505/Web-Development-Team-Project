import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const RecipeFormPage = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // If editing, fetch existing recipe
    if (id) {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(`/recipes/${id}`);
          const recipe = response.data;
          setTitle(recipe.title);
          setIngredients(recipe.ingredients);
          setInstructions(recipe.instructions);
        } catch (error) {
          setError("Failed to load recipe.");
        }
      };

      fetchRecipe();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, ingredients, instructions };
      if (id) {
        await API.put(`/recipes/${id}`, payload);
      } else {
        await API.post("/recipes", payload);
      }
      navigate("/recipes"); // Redirect to recipe list
    } catch (error) {
      setError("Failed to save recipe");
    }
  };

  return (
    <div className="recipe-form-page">
      <h1>{id ? "Edit Recipe" : "Create Recipe"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingredients:</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <button type="submit">{id ? "Update Recipe" : "Create Recipe"}</button>
      </form>
    </div>
  );
};

export default RecipeFormPage;
