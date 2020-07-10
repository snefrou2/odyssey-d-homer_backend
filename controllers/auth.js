const { connection } = require("../conf");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../passport-strategies");

//permer à un visiteur de créer un compte
const signUp = async (req, res) => {
  const formdata = req.body;
  req.body.password = bcrypt.hashSync(req.body.password, 8);

  await connection.query("INSERT INTO users SET ?", formdata),
    (er,
    (res) => {
      if (er) return res.status(500);
    });
  const user = {
    email: req.body.email,
    name: req.body.name,
  };
  const token = jwt.sign(user, "secret");
  return res.status(200).send({ user, token });
};

//permet à un utilisateur de se connecter
const signIn = (req, res) => {
  passport.authenticate("local", { session: false }, async (err, user) => {
    if (err) {
      console.log("error", err);
      return res.sendStatus(500);
    }
    console.log(err, user);
    if (!user) {
      console.log("No user found");
      return res.sendStatus(500);
    }

    const token = await jwt.sign(user, "secret");
    return res.status(200).send({
      user,
      token,
    });
  })(req, res);
};

module.exports = { signUp, getAll, signIn };
