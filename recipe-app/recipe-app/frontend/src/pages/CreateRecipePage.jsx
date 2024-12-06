import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateRecipePage = () => {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    title: "",
    ingredients: "",
    instructions: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateRecipe = async () => {
    if (!newRecipe.name || !newRecipe.title || !newRecipe.ingredients || !newRecipe.instructions) {
      setError("All fields are required to create a recipe.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create a recipe.");
      navigate("/"); // Redirect to login if token is missing
      return;
    }

    try {
      await axios.post(
        "http://localhost:8888/api/recipes",
        {
          ...newRecipe,
          ingredients: newRecipe.ingredients.split(",").map((item) => item.trim()),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setError("");
      navigate("/recipes"); // Navigate to Recipe List after successful creation
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create recipe.");
    }
  };

  return (
    <div>
      <h1>Create Recipe</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Title"
          value={newRecipe.title}
          onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ingredients (comma-separated)"
          value={newRecipe.ingredients}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, ingredients: e.target.value })
          }
        />
        <textarea
          placeholder="Instructions"
          value={newRecipe.instructions}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, instructions: e.target.value })
          }
        />
        <button onClick={handleCreateRecipe}>Create</button>
        <button onClick={() => navigate("/recipes")}>Back to Recipes</button>
      </div>
    </div>
  );
};

export default CreateRecipePage;
