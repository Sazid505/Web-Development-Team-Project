import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecipeListPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch recipes on component mount
    useEffect(() => {
        const fetchRecipes = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to view recipes.');
                navigate('/login'); // Redirect to login if not authenticated
                return;
            }
            try {
                const response = await axios.get('http://localhost:8888/api/recipes', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRecipes(response.data); // Set recipes
                setError(''); // Clear any errors
            } catch (err) {
                setError('Failed to fetch recipes. Please try again later.');
            }
        };
        fetchRecipes();
    }, [navigate]);

    // Delete recipe
    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to delete a recipe.');
            return;
        }
        try {
            await axios.delete(`http://localhost:8888/api/recipes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRecipes(recipes.filter((recipe) => recipe._id !== id)); // Remove deleted recipe from state
            setError('');
        } catch (err) {
            setError('Failed to delete recipe. Please try again later.');
        }
    };

    // Edit recipe (navigate to edit page)
    const handleEdit = (id) => {
        navigate(`/edit-recipe/${id}`); // Redirect to edit page with recipe ID
    };

    return (
        <div>
            <h1>Recipe List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Recipe List */}
            <ul style={{ padding: 0, listStyleType: "none" }}>
                {recipes.map((recipe) => (
                    <li
                        key={recipe._id}
                        style={{
                            marginBottom: '20px',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                        }}
                    >
                        <h3>{recipe.name}</h3>
                        <p><strong>Title:</strong> {recipe.title}</p>
                        <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>

                        {/* Edit Button */}
                        <button
                            style={{
                                marginRight: '10px',
                                padding: '8px 15px',
                                backgroundColor: '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleEdit(recipe._id)}
                        >
                            Edit
                        </button>

                        {/* Delete Button */}
                        <button
                            style={{
                                padding: '8px 15px',
                                backgroundColor: '#FF0000',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleDelete(recipe._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {/* Button to Create New Recipe */}
            <button
                style={{
                    marginTop: '20px',
                    marginRight: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={() => navigate('/create-recipe')}
            >
                Create New Recipe
            </button>

            {/* Home Button */}
            <button
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#28A745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={() => navigate('/home')}
            >
                Home
            </button>
        </div>
    );
};

export default RecipeListPage;
