const User = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1. *POST /users/register*: Allows a new user to create an account.
module.exports.register = async (req, res) => {
  try {
    const { fname,lname,contact, email, password } = req.body;
    if (!(fname && lname && contact && email && password)) {
      res.status(400).send({ Message: "All fields are compulsory." });
    }
    if ((await User.isUserExists(email)) == true) {
      return res
        .status(409)
        .json({ message: "Username already exists, try with different" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const userData = {
      ...req.body,
      password: hashPassword,
    };
    await User.newUser(userData);
    let token = jwt.sign({ ...userData }, process.env.TOKEN_SECRET, {});
    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 2. *POST /users/login*
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.varifyUser(email, password);
    if (userData == null) {
      return res
        .status(401)
        .json({ message: "Username and password does not match" });
    }
    let token = jwt.sign({ ...userData }, process.env.TOKEN_SECRET, {});
    return res.status(200).json({ message: "User login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};




