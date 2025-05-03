const express = require("express");
const { user } = require("../model/user");

const bcrypt = require("bcrypt");
const validuser = require("../utils/validateuser");
const authrouter = express.Router();

authrouter.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10); // 10 is a good default
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;
    await user.create(req.body);
    /*const mandatoryfield = ["firstname", "lastname", "gender"]; //this is api level validation using these to save the multiple time crud operation in databse thus saving the cost of using database
    const isAllowed = mandatoryfield.every((k) =>
      Object.keys(req.body).includes(k)
    );*/
    validuser(req.body);
    /*if (isAllowed) {
      res.status(200).send("User registered Successfully!!");
    } else throw new Error("Mandatory Field Missing");*/
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

authrouter.post("/login", async (req, res) => {
  try {
    const people = await user.findOne({ emailid: req.body.emailid }); // await here

    if (!people) {
      return res.status(404).send("User not found");
    }

    if (req.body.emailid !== people.emailid) {
      return res.status(401).send("Invalid email");
    }

    const isAllowed = await bcrypt.compare(req.body.password, people.password);

    if (!isAllowed) {
      return res.status(401).send("Invalid password");
    }

    //token
    /*const token = jwt.sign(
      { _id: people._id, emailid: people.emailid },
      "SayantanKey",
      { expiresIn: 10 }
    ); //Payload and key... payload should not contain any important credentianls as its only encoded 64bit format*/

    const token = people.getjwt();

    res.cookie("token", token); // optional
    console.log(req.cookies);
    res.send("Login Successful");
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = authrouter;
