//variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
//db
require("./config/db");

const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const cors= require('cors');

//express
const express = require("express");
const app = express();
//par default il ya protection de cors donc refuse toute requete exterieur
//tout le monde est autorise a faire des requete en utilisabt cors()
//app.use(cors())
//ici on va authorise uniquement le client local ainsi que quelque pqrqmetre
const corsOptions = {
  origin:process.env.CLIENT_URL,
  credentials:true,
  'allowedHeaders':['sessionId', 'Content-Type'],
  'exposedHeaders':['sessionId'],
  'preflightContinue':false,
};

app.use(cors({corsOptions}));

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

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
app.use('/api/post',postRoutes);

// server
app.listen(PORT, () => {
  console.log(`listenning on ${PORT}`);
});
