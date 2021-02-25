//variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
//db
require("./config/db");

const { checkUser, requireAuth } = require('./middleware/auth.middleware');

//express
const express = require("express");
const app = express();
const userRoutes = require('./routes/user.routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// bodyparser va mettre en bon format quns requetes dans le body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
//pour decoder les cookie
app.use(cookieParser());

//middleware pour jwt
//pour n'importe quelle route (*) on lance le middleware checkUser
app.get('*',checkUser );
app.get('/jwtid', requireAuth,(req,res)=>{
  res.status(200).send(res.locals.user._id)
});

//routes
app.use('/api/user', userRoutes);

// server
app.listen(PORT, () => {
  console.log(`listenning on ${PORT}`);
});
