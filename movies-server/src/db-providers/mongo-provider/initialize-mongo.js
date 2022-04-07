const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGO_URL}`).then(res => console.log("Mongo Running Successfully"))
                                            .catch(e  => console.log("Mongo Failed to run "));
