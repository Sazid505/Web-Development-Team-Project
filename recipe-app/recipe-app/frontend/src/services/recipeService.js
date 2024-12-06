import axios from 'axios';

const API_URL = 'http://localhost:8888/api/recipes';

// Create a new recipe
const createRecipe = async (recipeData) => {
  const response = await axios.post(API_URL, recipeData);
  return response.data;
};

// Get a recipe by ID
const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update a recipe
const updateRecipe = async (id, recipeData) => {
  const response = await axios.put(`${API_URL}/${id}`, recipeData);
  return response.data;
};

// Delete a recipe
const deleteRecipe = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export { createRecipe, getRecipeById, updateRecipe, deleteRecipe };
