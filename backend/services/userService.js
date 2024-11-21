const bcrypt = require("bcryptjs");
const db = require("../config/db");
const Users = require("../models/userSchema");

module.exports.isUserExists = async (email) => {
  try {
    const user = await Users.findOne({email});
    if (user == null) return false;
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.newUser = async (userData) => {
  try {
    const newUser = new Users(userData);
    await newUser.save();
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.varifyUser = async (email, password) => {
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return null; 
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null; // Password mismatch
    }
    return user;
  } catch (err) {
    throw new Error(err);
  }
};
