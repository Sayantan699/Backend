const express = require("express");
const { user } = require("../model/user");
const userrouter = express.Router();

userrouter.get("/:id", async (req, res) => {
  try {
    const result = await user.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.send("Error" + err.message);
  }
});

userrouter.delete("/:id", async (req, res) => {
  try {
    const result = await user.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    res.send("Error" + err.message);
  }
});

userrouter.patch("/", async (req, res) => {
  //API level validation
  try {
    const { _id, ...update } = req.body; //destructuing the object to extract the id and update the following given in req.body based upon the unique id
    const result = await user.findByIdAndUpdate(_id, update, {
      //we have to manually validate while updating
      runValidators: true,
    });
    res.send("Update succesfully");
  } catch (err) {
    res.send("Error" + err.message);
  }
});

module.exports = userrouter;
