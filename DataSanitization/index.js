const main = require("./database");
const { user } = require("./model/user");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/register", async (req, res) => {
  const ans = await user.find({});
  res.send(ans);
});

app.post("/register", async (req, res) => {
  try {
    await user.create(req.body);
    const mandatoryfield = ["firstname", "lastname", "gender"]; //this is api level validation using these to save the multiple time crud operation in databse thus saving the cost of using database
    const isAllowed = mandatoryfield.every((k) =>
      Object.keys(req.body).includes(k)
    );
    if (isAllowed) {
      res.status(200).send("User registered Successfully!!");
    } else throw new Error("Mandatory Field Missing");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
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
