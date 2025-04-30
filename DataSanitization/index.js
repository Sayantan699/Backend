const main = require("./database");
const { user } = require("./model/user");
const validuser = require("./utils/validateuser");
const validateuser = require("./utils/validateuser");
const bcrypt = require("bcrypt");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/register", async (req, res) => {
  const ans = await user.find({});
  res.send(ans);
});

app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const people = await user.findById(req.body._id); // await here

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

    res.cookie("token", "abcdefghijkl"); // optional
    res.send("Login Successful");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const result = await user.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.send("Error" + err.message);
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const result = await user.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    res.send("Error" + err.message);
  }
});

app.patch("/user", async (req, res) => {
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

main()
  .then(() => {
    console.log("Connected to Database");
    app.listen(5900, () => {
      console.log("In 5900 port");
    });
  })
  .catch((err) => console.log(err));
