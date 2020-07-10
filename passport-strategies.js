const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { connection } = require("./conf");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (formMail, formPass, done) => {
      console.log(formPass);
      connection.query(
        "SELECT id, email, password FROM users WHERE email=?",
        [formMail],
        (err, res) => {
          if (err) {
            console.log("----");
            console.log(err.sql);
            console.error(err.message);
            return done(err);
          }
          if (!res.length) {
            console.log("----");
            console.log("No user");
            return done(null, false, {
              msg: "Incorrect user!",
            });
          }

          const user = res[0];
          const isPasswordOk = bcrypt.compareSync(formPass, user.password);

          if (!isPasswordOk) {
            return done(null, false, {
              msg: "Incorrect password!",
            });
          }

          return done(null, { ...user });
        }
      );
    }
  )
);
