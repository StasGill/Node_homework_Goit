const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "E-mail is required"],
    minlength: 2,
    maxlength: 20,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 2,
    maxlength: 20,
  },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: {
    type: String,
  },
});

userSchema.methods.setPassword = async function (password) {
  this.token = await bcrypt.hashSync(password, bcrypt.genSaltSync(6));
};

userSchema.methods.validPassword = async function (password) {
  const response = await bcrypt.compareSync(password, this.token);
  return response;
};

const UserModel = new model("user", userSchema);

module.exports = UserModel;