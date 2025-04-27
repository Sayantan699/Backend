const express = require("express");
const app = express();
const main = require("./database");
const { user, insertuser } = require("./model/user");

app.use(express.json());

// CRUD: Create Read Update Delete

app.get("/info", async (req, res) => {
  const ans = await user.find({});
  res.send(ans);
});

app.post("/info", async (req, res) => {
  // const ans = new User(req.body);
  // await ans.save();

  try {
    await user.create(req.body);
    res.send("Succesfully Updated");
  } catch (err) {
    res.status(500).send(err);
  }
});

main()
  .then(async () => {
    console.log("Connected to Database");
    //await insertuser();
    app.listen(6900, () => {
      console.log("Listening at port 6900");
    });
  })
  .catch((err) => console.log(err));
