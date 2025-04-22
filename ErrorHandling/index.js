const express = require("express");
//require("./model/user");
const main = require("../mongoose/database2");
const user = require("../mongoose/model/user");
const app = express();
const { Auth } = require("./middleware/auth");
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

const AddtoCart = []; //user kah food yehape add hoga

app.use(express.json());
app.get("/food", (req, res) => {
  res.status(200).send(foodmenu);
});
//Authenticate admin here
//app.use("/admin", Auth);

app.post("/admin", Auth, (req, res) => {
  foodmenu.push(req.body);
  res.send("Item Added Successfully!!");
});

app.get("/user", (req, res) => {
  if (AddtoCart.length == 0) res.send("No Items in cart");
  res.send(AddtoCart);
});

app.post("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const fooditem = foodmenu.find((item) => item.id === id);
  if (fooditem) {
    AddtoCart.push(fooditem);
    res.status(200).send("Item added succesfully!");
  } else {
    res.send("Item out of stock");
  }
});

app.delete("admin/:id", Auth, (req, res) => {
  const id = parseInt(req.params.id);

  const index = foodmenu.findIndex((item) => item.id === id);
  if (index === -1) {
    res.send("Item doesnt exist...");
  } else {
    foodmenu.splice(index, 1);
    res.send("Deleted Succesfully...");
  }
});

app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = foodmenu.findIndex((item) => item.id === id);
  if (index != -1) {
    AddtoCart.splice(index, 1);
    res.send("Item deleted");
  } else res.send("Failed to delete Item ");
});

app.get("/dummy", (req, res) => {
  try {
    JSON.parse("Invalid"); //this is a invalid json format i.e we have to use try catch to handle errors
    res.send("Hello coder");
  } catch (err) {
    res.send("Error occur in json");
  }
});

main() // with this we are connecting the database at first
  .then(() => {
    console.log("connected to DB");
    app.listen(8000, () => {
      console.log("Listening port 8000");
    });
  })
  .catch((err) => console.log(err));
