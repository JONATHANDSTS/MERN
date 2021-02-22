//variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
//db
require("./config/db");
//express
const express = require("express");
const app = express();

app.listen(PORT, () => {
  console.log(`listenning on ${PORT}`);
});
