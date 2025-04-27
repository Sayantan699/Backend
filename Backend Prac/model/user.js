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
      type: String,
      required: true,
      enum: ["male", "female", "others"],
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

const user = mongoose.model("user", userformat);

async function insertuser() {
  try {
    await user.insertMany([
      {
        name: "Penakesh",
        age: 19,
        gender: "male",
        email: "penakesh@gmail.com",
      },
    ]);

    await user.create({
      name: "Rahul",
      age: 19,
      gender: "male",
      email: "rahul69@gmail.com",
    });

    console.log("Data inserted successfully ✅");
  } catch (error) {
    console.error("Error inserting data ❌", error.message);
  }
}

module.exports = { user, insertuser };
