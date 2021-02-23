//variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
//db
require("./config/db");
//express
const express = require("express");
const app = express();
const userRoutes = require('./routes/user.routes');
const bodyParser = require('body-parser');
// bodyparser va mettre en bon format quns requetes dans le body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
//routes
app.use('/api/user', userRoutes)

// server
app.listen(PORT, () => {
  console.log(`listenning on ${PORT}`);
});
