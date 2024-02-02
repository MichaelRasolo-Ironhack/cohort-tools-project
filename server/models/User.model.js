const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: [true, "Email required"], unique: true },
  password: {
    type: String,
    required: [true, "Password required"],
    select: false,
  },
  name: { type: String, required: [true, "Name required"] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
