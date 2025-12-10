/*
  Reference: Week 11 – Static files, MongoDB, Mongoose
  Course: Web Application Development
  Instructor:Hamilton 
*/
const mongoose = require("mongoose");

//define the schema for a Movie
const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, //title of the movie 
    year: { type: Number, required: true }, //year of the movie
    genre: { type: String, required: true }, //genre of the movie 
    description: { type: String, required: true } //description of the movie 
  },
  
);

// export the Movie model based on the MovieSchema
module.exports = mongoose.model("Movie", MovieSchema);
