const express = require("express");
const app = express();
const main = require("./database2");
const User = require("./model/user");
const valid = require("./utils/validator");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cookieparser());

/*

// CRUD: Create Read Update Delete

app.get("/info", async (req, res) => {
  const ans = await User.find({});
  res.send(ans);
});

app.post("/info", async (req, res) => {
  // const ans = new User(req.body);
  // await ans.save();

  try {
    await User.create(req.body);
    res.send("Succesfully Updated");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/info", async (req, res) => {
  await User.deleteOne({ name: "Arjita" });
  res.send("Deleted");
});

app.put("/info", async (req, res) => {
  const result = await User.updateOne(
    { name: "Mohan" },
    { age: 40, city: "Bangladesh" }
  );
  res.send("Updated Succesfully");
});
*/
app.get("/info", async (req, res) => {
  try {
    const result = await User.find({});

    //generating jwt token
    /*jwt.sign({ id: user._id }, secret, options);*/
    res.cookie("token", token);
    res.send(result);
  } catch (err) {
    res.send("Error" + err.message);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.send("Error" + err.message);
  }
});
app.post("/register", async (req, res) => {
  try {
    valid(req.body);
    //converting password into hash
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await User.create(req.body);
    res.send("User Registered Succesfully...");
  } catch (err) {
    res.send("Error" + err.message);
  }
});

app.patch("/user", async (req, res) => {
  try {
    const { _id, ...update } = req.body;
    await user.findByIdAndUpdate(_id, update, { runValidators: true });
    res.send("updated");
  } catch (err) {
    res.send("Error" + err.message);
  }
});

main()
  .then(async () => {
    console.log("Connected to DB"); // at first connect to db then listen to server
    app.listen(6500, () => {
      console.log("Listening at port 6500");
    });
  })
  .catch((err) => console.log(err));
