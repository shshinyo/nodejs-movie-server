const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const movieSchema =  mongoose.Schema({
     Title: String,
     Released: Date,
     Genre: String,
     Director: String,
     Created_by:Number
});

module.exports  = mongoose.model('movie', movieSchema);
