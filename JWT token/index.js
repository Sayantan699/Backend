const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users");
const validUser = require("./utils/validateuser");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userauth = require("./middleware/userAuth");

app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
  try {
    // Validate kya uske andar firstName
    validUser(req.body);

    //  converting password into hashing
    req.body.password = await bcrypt.hash(req.body.password, 10);

    await User.create(req.body);
    res.send("User Registered Successfully");
  } catch (err) {
    res.send("Error " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    // validate karna

    const people = await User.findOne({ emailId: req.body.emailId });

    // if(!(req.body.emailId===people.emailId))
    //     throw new Error("Invalid credentials");

    const IsAllowed = verifyPassword(req.body.password);

    if (!IsAllowed) throw new Error("Invalid credentials");

    // jwt token

    const token = people.getjwt();

    res.cookie("token", token);
    res.send("Login Successfully");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

app.get("/info", async (req, res) => {
  try {
    // validate the user first

    const payload = jwt.verify(req.cookies.token, "Rohit@13412$");
    console.log(payload);
    const result = await User.find();

    res.send(result);
  } catch (err) {
    res.send("Error" + err.message);
  }
});

app.get("/user", userauth, async (req, res) => {
  res.send(req.result);
});

app.delete("/user/:id", userauth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("Deleted Succesfully");
  } catch (err) {
    res.send("Error" + err.message);
  }
});

// {
//     "_id":"67ec0a8bffe09233dc9c93fc",
//     "age": 12,
//     "emailId": "mohan@gmail.com"
// }

app.patch("/user", async (req, res) => {
  try {
    const { _id, ...update } = req.body;

    await User.findByIdAndUpdate(_id, update, { runValidators: true });
    res.send("Update Succesfully");
  } catch (err) {
    res.send("Error " + err.message);
  }
});

main()
  .then(async () => {
    console.log("Connected to DB");
    app.listen(3000, () => {
      console.log("Listening at port 3000");
    });
  })
  .catch((err) => console.log(err));
