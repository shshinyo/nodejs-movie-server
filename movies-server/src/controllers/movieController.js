const axiosController = require("../utils/axios.controller");
const dbMovieController = require("../db-providers/mongo-provider/db-controllers/db-movies-controller");

const getMovies = async (req, res) => {
    let result = await dbMovieController.dbGetMovies();
    res.json(result)
}

const addMovie = async (req, res) => {
    let body = req.body;
    const { userId, role } = req.user;
    body.Created_by = req.user.userId;
    let result = await dbMovieController.dbAddMovie(body, userId, role);
    if (result.Error && result.status == 1) return res.status(405).json({ Message: result.Error }); // when basic user exceeds MAX_NUM_OF allowed movies
    if (result.Error && result.status == 2) return res.status(400).json({ Message: result.Error });
    return res.json(result);

}

const checkIfTitleExists = async (req, res, next) => {
    let { Title } = req.body;
    if (!Title ) {
        return res.status(400).json({ Message: "Bad Request Missing Parameters" });
    }
    // check if title exists in  http://www.omdbapi.com.

    let result = await axiosController.ConsumeServiceApi("POST", `http://www.omdbapi.com/?t=${Title}&apikey=db1c2ce6`);
    if (result) {
        if (result.Error) {
            return res.json({ Message: result.Error });
        } else {
            const { Title, Released, Genre, Director } = result;
            req.body = { Title, Released, Genre, Director };
            next();
        }
    } else {
        return res.status(403).json({ Message: "Failed to get Results from ombapi.com check api key" });
    }

}

module.exports = {
    getMovies,
    addMovie,
    checkIfTitleExists

}