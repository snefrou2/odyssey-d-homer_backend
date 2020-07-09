require("dotenv").config();
const express = require("express");

const app = express();

const auth = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use("/signup", auth);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Erreur server");
  } else {
    console.log(`Server is listening on ${process.env.PORT}`);
  }
});
