/*

const mongoose = require("mongoose");
//const { Schema } = mongoose;
async function main() {
  await mongoose.connect(
    "mongodb+srv://coderarmy:7FHkRg9TSemYCE8F@clusterarmy.neoceen.mongodb.net/Bookstore" //this will create a database Bookstore if its not exist otherwise nothing
  );

  //write code here

  //creating schema here

  /*
  const userSchema = new Schema({
    name: String,
    age: Number,
    gender: String,
    city: String,
  });*/

//create model(create collection)
//const user = mongoose.model("user", userSchema); //class create huya

/*
const user1 = new user({
  name: "Sayantan",
  age: 19,
  city: "kolkata",
  gender: "Male",
});

await user1.save();
*/

/*await user.create({
    //create and save to database in one single step..
    name: "Sayantan",
    age: 19,
    city: "kolkata",
    gender: "Male",
  });

  const result = await user.find({ name: "Sayantan" });
  console.log(result);
}

/*main()
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

module.exports = main;
*/

const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb+srv://coderarmy:7FHkRg9TSemYCE8F@clusterarmy.neoceen.mongodb.net/Instagram"
  );
}

module.exports = main;
