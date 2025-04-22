const express = require("express");

const app = express(); //Server Created...

/*app.use("/", (req, res) => {
  res.send({
    name: "Sayantan",
    age: 20,
    roll: "53",
    title: "Student",
    loc: "Kolkata",
  });
});*/

app.use("/contact", (req, res) => {
  res.send("HI I am your contact page");
});

app.use("/detail", (req, res) => {
  res.send("I am your detail page");
});

app.use("/service/:id", (req, res) => {
  console.log(req.params);
  res.send("I am service page ");
});

app.use("/", (req, res) => {
  res.send("I am Default ");
});
app.listen(8000, () => {
  console.log("Listening at port number 8000");
});
