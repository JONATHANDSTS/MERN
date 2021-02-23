const mongoose = require("mongoose");
//on appelle isEmail de la lib validator pour la valisation de l'email
const { isEmail } = require("validator");
//pour crypter le password on importe la lib
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLenght: 3,
      maxLenght: 55,
      umique: true,
      trimp: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minLenght: 6,
    },
    pictures: {
      type: String,
      default: "./upload/profil/random-user.png",
    },
    bio: {
      type: String,
      max: 1024,
    },
    followers: {
      //followers ce sera un tableau donc contiendra des string donc des []
      type: [String],
    },
    follwing: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// play function before save into display "block"\
// pas de fonction fleche car on utilise .this
userSchema.pre("save", async function (next) {
  // bcrypt va generer une serie de characteres que lui seul connait pour sale le password
  const salt = await bcrypt.genSalt();
  //une fois sale, on doit ajouter a notre password, donc .this
  this.password = await bcrypt.hash(this.password, salt);
  // cest un middleware donc il faut finir par next()
  next();
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
