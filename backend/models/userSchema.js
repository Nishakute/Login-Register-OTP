const mongoose = require("mongoose");
const UsersSchema = new mongoose.Schema({
  fname: { type: String, require: true },
  lname: { type: String, require: true },
  contact: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});
const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;
