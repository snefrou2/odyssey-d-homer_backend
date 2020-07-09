const { connection } = require("../conf");

const postAuth = async (req, res) => {
  const formData = req.body;
  try {
    // post user
    const data = await connection.query("INSERT INTO users SET ?", [formData]);

    return res.status(200).send(data);
  } catch (e) {
    console.log(e);
    return res.status(500).send("sorry we have an error");
  }
};

const getAll = async (req, res) => {
  try {
    // get users
    const data = await connection.query("SELECT * FROM users");

    return res.status(200).send(data);
  } catch (e) {
    console.log(e);
    return res.status(500).send("sorry we have an error");
  }
};

module.exports = { postAuth, getAll };
