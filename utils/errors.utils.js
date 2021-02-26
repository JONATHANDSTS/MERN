module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "pseudo incorrect ou deja pris";

  if (err.message.includes("email")) errors.email = "email incorrect";

  if (err.message.includes("password"))
    errors.password = "password doit faire 6 charactere mini";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "ce pseudo est deja pris";
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "email deja enregistre";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "email inconnu";

  if (err.message.includes("password")) errors.password = "erreur de password";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file"))
    errors.format = "format incompatible";

  if (err.message.includes("max size"));
  errors.maxSize = "le fichier depasse 5mo";

  return errors;
};
