const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        title: { type: String, required: true },
        ingredients: { type: Array, required: true },
        instructions: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
