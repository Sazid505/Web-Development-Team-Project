const express = require('express');
const router = express.Router();
const { getRecipes, createRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.route('/recipes').get(protect, getRecipes).post(protect, createRecipe);
router.route('/recipes/:id').put(protect, updateRecipe).delete(protect, deleteRecipe);
router.put('/recipes/:id', async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found.' });
        }
        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ message: 'Failed to update recipe.' });
    }
});
module.exports = router;
