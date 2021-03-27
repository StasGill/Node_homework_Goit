const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    default: "Undefined User",
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    minlength: 2,
    maxlength: 20,
    unique: true, // match: /[A-z]{2,20}/g,
  },
  number: Number,
});

const UserModel = new model("contacts", userSchema);

module.exports = UserModel;
