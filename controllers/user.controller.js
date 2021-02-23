const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  //on recherche et selectionne tout sauf le password
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  // on verifie si l'id demande existe dans la BDD
  // si elle existe pas on envoi status 400 et on sarrete la
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  // si elle existe on recherche et en voie la data (docs)
  UserModel.findById(req.params.id, (err, docs) => {
    // si pas d'erreur on envoi les datas
    if (!err) res.send(docs);
    else console.log("ID unknown:" + err);
    // on selectionne tout sauf le password
  }).select("-password");
};

module.exports.updateUSer = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
