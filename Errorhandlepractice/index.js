const express = require("express");
const auth = require("./middleware/auth");
const app = express();

const foodmenu = [
  { id: 1, food: "Chowmein", category: "veg", price: 400 },
  { id: 2, food: "Mutton", category: "non-veg", price: 800 },
  { id: 3, food: "chicken", category: "non-veg", price: 100 },
  { id: 4, food: "Egg", category: "non-veg", price: 20 },
  { id: 5, food: "paneer", category: "veg", price: 100 },
  { id: 6, food: "butter naan", category: "veg", price: 80 },
  { id: 7, food: "momo", category: "non-veg", price: 70 },
  { id: 8, food: "chai", category: "veg", price: 60 },
  { id: 9, food: "biriyani", category: "non-veg", price: 260 },
  { id: 10, food: "Whey Protein", category: "veg", price: 2000 },
];

const addocart = [];

app.use(express.json()); //converting json to js object

app.get("/food", (req, res) => {
  res.status(200).send(foodmenu);
});

app.post("/admin", auth, (req, res, next) => {
  try {
    foodmenu.push(req.body);
    res.send("Added Succuesfully");
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", auth, (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = foodmenu.findIndex((item) => item.id === id);
    if (index === -1) {
      res.status(404).send("Item not found!!");
      //index = -1 i.e item is not present
    } else {
      foodmenu.splice(index, 1);
      res.send("Successfully deleted");
    }
  } catch (err) {
    console.log(err);
  }
});

app.patch("/update", auth, (req, res, next) => {
  try {
    const id = req.body.id;
    const fooddata = foodmenu.find((item) => item.id === id);
    if (fooddata) {
      if (req.body.food) fooddata.food = req.body.food; //these are just reference to object thats why changing these reflex on original object..
      if (req.body.category) fooddata.category = req.body.category;
      if (req.body.price) fooddata.price = req.body.price;

      res.status(200).send("succesfully updated");
    } else {
      res.send("food data problem");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(6000, () => {
  console.log("listening at port 6000");
});
