const { connection } = require("../conf");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../passport-strategies");

const signUp = async (req, res) => {
  const formdata = req.body;
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  t;
  // post user
  await connection.query("INSERT INTO users SET ?", formdata);
  const user = {
    email: req.body.email,
    name: req.body.name,
  };
  const token = jwt.sign(user, "secret");
  return res.status(200).send({ user, token });
};

const signIn = (req, res) => {
  passport.authenticate("local", { session: false }, async (err, user) => {
    if (err) {
      console.log("----");
      console.log(err);
      return res.sendStatus(500);
    }
    console.log(err, user);
    if (!user) {
      console.log("----");

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

const getAll = async (res) => {
  // get users
  const data = await connection.query("SELECT * FROM users");

  return res.status(200).send(data[0]);
};

module.exports = { signUp, getAll, signIn };
