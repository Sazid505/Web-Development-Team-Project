const Recipe = require("../modules/recipeModel");

// GET all recipes
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
};

// POST a new recipe
const createRecipe = async (req, res) => {
    try {
        const { name, title, ingredients, instructions } = req.body;

        if (!name || !title || !ingredients || !instructions) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newRecipe = new Recipe(req.body);
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (err) {
        res.status(400).json({ error: "Failed to create recipe" });
    }
};

// PUT update a recipe
const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedRecipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ error: "Failed to update recipe" });
    }
};

// DELETE a recipe
const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete recipe" });
    }
};

module.exports = { getRecipes, createRecipe, updateRecipe, deleteRecipe };
