/*
  Partial reference: Some portions of this code were assisted or inspired by ChatGPT
*/

const express = require("express"); // import Express framework
const router = express.Router(); // create a router object to handle routes
const Movie = require("../models/movies"); //Import the Movie model

//return all movies from the database - ChatGpt code
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch all movies from the MongoDB collection using the Movie model
    res.json(movies); //  // Send the list of movies as JSON response
  } catch (err) {
    res.status(500).json({ error: err.message }); // If there's an error, send a 500 status code with error message
  }
});

module.exports = router; //// export this router 
