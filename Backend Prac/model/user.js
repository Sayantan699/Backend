const mongoose = require("mongoose");

const { Schema } = mongoose;

const userformat = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 15,
      unique: true,
    },
    gender: {
      type: Male,
      required: true,
      enum: ["male", "female", "others"], //only with these 3 option selected as gender will be registered to database..
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userformat); //class create huya

await user.insertMany([
  { name: "Penakesh" },
  { age: 19 },
  { gender: male },
  { email: "penakesh@gmail.com" },
]);

const usernew = new user({
  name: "Rahul",
  age: 19,
  email: "rahul69@gmail.com",
  gender: "Male",
});

module.exports = user;
