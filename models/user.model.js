const mongoose = require("mongoose");
//on appelle isEmail de la lib validator pour la valisation de l'email
const { isEmail } = require("validator");

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
    pictures:{
        type:String,
        default:"./upload/profil/random-user.png"
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

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;