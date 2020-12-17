const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Recipe = require("./models/recipe.js");
const app = express();

//Connect to database
mongoose.connect("mongodb+srv://recipe-app-user:recipe123@cluster0.7a3ne.mongodb.net/recipe-app-database?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//Check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to database");
});

//ROUTES

//GET ALL RECIPES
app.get("/recipes", (req, res) => {
    Recipe.find({}, (err, allRecipes) => {
        if(!err){
            console.log(allRecipes);
            res.send(allRecipes);
        } else {
            console.log(err);
        }
    });
});

//GET SINGLE RECIPE BY ID
app.get("/recipes/:id", (req, res) => {
    console.log(req.params.id)
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if(!err){
            console.log(foundRecipe);
            res.send(foundRecipe);
        } else {
            console.log(err);
        };
    });
});


//ADD RECIPE
app.post("/recipes", (req, res) => {
    //Convert data into correct type and build data object
    const ingredients = req.body.body.ingredients.split("|");
    const directions = req.body.body.directions.split("|");
    const ratingNum = parseInt(req.body.body.rating);
    const rating = "*";
    
    const data = {
        name: req.body.body.name,
        description: req.body.body.description,
        image: req.body.body.image,
        author: req.body.body.author,
        rating: rating.repeat(ratingNum).split(""),
        prepTime: req.body.body.time,
        ingredients: ingredients,
        directions: directions
    }

    Recipe.create(data, (err, newRecipe) => {
        if(!err){
            console.log(newRecipe);
        } else {
            console.log(err);
        };
    });
});

//Start server on port 3000
app.listen(3000, function(){
    console.log(`Server listening on port 3000`);
});