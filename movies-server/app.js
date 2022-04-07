const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();
app.use(bodyParser.json());
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./src/utils/swagger.json");


app.use('/explorer', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const { PORT } = process.env;
require("./src/db-providers/mongo-provider/initialize-mongo");

app.use('/movies', require('./src/routes/movieRouter'));

app.listen(PORT, () => {
  console.log(`movies server Running on port : ${PORT} \n swagger Running on http://localhost:4000/explorer/#/`);
});
module.exports = app;
