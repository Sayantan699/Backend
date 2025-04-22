const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true, //i.e user must give first Name..
      unique: true,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
      max: 70,
      trim: true, //trim any spaces
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"], //only with these 3 option selected as gender will be registered to database..
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new error("Invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema); //It creates a Model class called user that
module.exports = user;

/*const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
  city: String,
});

const user = mongoose.model("user", userSchema); //It creates a Model class called user that
module.exports = user;
*/
