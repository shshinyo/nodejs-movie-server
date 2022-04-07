const express = require('express')
const router = express.Router();
const movieController = require("../controllers/movieController");
const authenticator = require("../middlewares/auth")
router.get('/',authenticator.auth , movieController.getMovies);
router.post('/add',authenticator.auth, movieController.checkIfTitleExists, movieController.addMovie);
router.get('/*',(req,res) => {
    res.json({message:"No API Provided"});
  });

module.exports = router