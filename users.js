const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userId: String,
  email: String,
  firstName: String,
  lastName: String,
  password: String,
});
module.exports = mongoose.model("user_details", userSchema);
