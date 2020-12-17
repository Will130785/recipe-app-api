const mongoose = require("mongoose");


const recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    author: String,
    rating: Array,
    prepTime: String,
    ingredients: Array,
    directions: Array
});

module.exports = mongoose.model("recipes", recipeSchema);