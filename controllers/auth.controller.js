const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

// en milliseconde donc 1000 milisonde=60seconde=60minutes=24 = 3 jours
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  // on donne a jwt un 1er parametre = l'id, le 2eme la variable environnement, le 3eme la date dexpiration
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;
  console.log(req.body);

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(200).send({ err });
    console.log(err);
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    // on met dans le coockie en !er parametres le nom du coockie,
    // en 2eme le coockie
    // en 3eme caracteristique
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(200).json(err);
    console.error(err);
  }
};

//pour la deconnection on enleve simpelement le cookie
// on le remplce par un autre vide qui disparait au bout de 1 ms
module.exports.logout =  (req, res) => {
  res.cookie("jwt", " ", { maxAge: 1 });
  // pour aboutir a la requete sur postaman besoin de faire un redirect
  res.redirect("/");
};
