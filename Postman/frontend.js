/*
const response2 = await fetch("https://api.example.com/data"); // Default get method

const data = response2.json();

//post,get,patch has same format just method is changed...

//In postman we dont need to write this formats its already inbuilt we just run and test our api
const response = await fetch("https://api.example.com/data", {
  method: "POST", //This method distinct the router route for different execution...
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "John", age: 30 }),
});

const response3 = await fetch("https://api.example.com/data", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ age: 30 }),
});
*/
const express = require("express");
const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("First");
    next();
  },
  (req, res, next) => {
    console.log("Second");
    next();
  },
  (req, res) => {
    console.log("Third");
    res.send("I am third");
  }
);

app.listen(2000, () => {
  console.log("Listening 2000");
});
