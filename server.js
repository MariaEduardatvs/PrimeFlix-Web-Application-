/*
  Reference: Sling Academy — “Node + Express + Mongoose: CRUD example (Rest API)”
  URL: https://www.slingacademy.com/article/node-express-mongoose-crud-example-rest-api/
*/

const express = require("express"); // framework to create the server and API
const mongoose = require("mongoose"); //connect and interact with MongoDB
const cors = require("cors");  //to enable Cross-Origin Resource Sharing
const path = require("path"); // Node.js module to handle file paths

// Enable cors for all routes
const app = express();
app.use(cors());
app.use(express.json()); 

const Movie = require("./models/movies");



// List all movies
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new movie
app.post("/api/movies", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const saved = await movie.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a movie
app.put("/api/movies/:id", async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Movie not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Delete a movie
app.delete("/api/movies/:id", async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Movie not found" });
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve index.html for any route that is not an API route
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
  }
});


// MongoDB connection

const PORT = process.env.PORT || 3000;
const URI = "mongodb+srv://MariaEduardaTavares:vZNFDltkm95VGfrj@primeflix.jcm3zvp.mongodb.net/movies?retryWrites=true&w=majority";

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.log("MongoDB connection error:", err));
