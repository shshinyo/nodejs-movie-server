const mongoose = require("mongoose");
const Movie = require("../models/movie.model")
const Max_NUM_MOVIEs_BASIc = 5;

const dbGetMovies = async () => {
    let movies = await Movie.find();
    console.log(movies)
    return movies

}

const dbAddMovie = async (movie, userId, role) => {
    console.log(movie, userId, role)
    if (role === "basic" && userId) {
        let userMoviesCount = await Movie.find({ Created_by: userId }).count();
        if (userMoviesCount >= Max_NUM_MOVIEs_BASIc) {
            return { Error: 'Basic User Cant Add more than 5', status: 1 }
        }

    }
    let newMovie = new Movie(movie);
    let res = await newMovie.save();
    if (res.Title) {
        return res;
    } else {
        return { Error: 'Error While creating Movie', status: 2 }
    }



}

module.exports = {
    dbGetMovies,
    dbAddMovie
}