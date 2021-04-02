const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = require("mongoose");

const contactSchema = new Schema({
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
  phone: {
    type: Number,
    required: [true, "Phone is required"],
    minlength: 2,
    maxlength: 20,
    unique: true,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
});

const ContactModel = new model("contacts", contactSchema);

module.exports = ContactModel;
