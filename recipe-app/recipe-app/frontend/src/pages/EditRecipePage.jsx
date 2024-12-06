import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipePage = () => {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState({
        name: "",
        title: "",
        ingredients: "",
        instructions: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to edit a recipe.");
                navigate("/login");
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8888/api/recipes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRecipe(response.data);
                setError("");
            } catch (err) {
                setError("Failed to fetch recipe details.");
            }
        };
        fetchRecipe();
    }, [id, navigate]);

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to update a recipe.");
            navigate("/login");
            return;
        }

        try {
            await axios.put(
                `http://localhost:8888/api/recipes/${id}`,
                recipe,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate("/recipes"); // Redirect to recipe list
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update recipe.");
        }
    };

    return (
        <div>
            <h1>Edit Recipe</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                placeholder="Name"
                value={recipe.name}
                onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Title"
                value={recipe.title}
                onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Ingredients"
                value={recipe.ingredients}
                onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
            />
            <textarea
                placeholder="Instructions"
                value={recipe.instructions}
                onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
            />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default EditRecipePage;
