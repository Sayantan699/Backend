const mongoose = require("mongoose");
const { Schema } = mongoose;

const userschema = new Schema({
  firstname: {
    type: String,
    required: true,
    maxLength: 15,
  },
  lastname: {
    type: String,
    required: true,
    maxLength: 15,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "others"],
    validate(value) {
      if (!["male", "female", "others"].includes(value))
        throw new Error("Invalid Gender");
    },
  },
  emailid: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true, // ✅ only email should be unique
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
  },
});

const user = mongoose.model("user", userschema);

module.exports = { user };
