/*const url =
  "mongodb+srv://coderarmy:7FHkRg9TSemYCE8F@clusterarmy.neoceen.mongodb.net/"; //this url is to connect cluster with local machine using mongodb compass*/

const { MongoClient } = require("mongodb"); //Mongoclient is a class
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =
  "mongodb+srv://coderarmy:7FHkRg9TSemYCE8F@clusterarmy.neoceen.mongodb.net/";
const client = new MongoClient(url); //creates a object

// Database Name
const dbName = "CoderArmy"; //Name of database

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName); //to connect with database...
  const collection = db.collection("user"); //collection name

  // the following code examples can be pasted here...

  const findResult = await collection.find({}).toArray(); // await as it take times to completely fetch data..
  console.log("Found documents =>", findResult);

  //to insert many documents
  /*
  const insertResult = await collection.insertMany([
    { a: 1 },
    { a: 2 },
    { a: 3 },
  ]);
  console.log("Inserted documents =>", insertResult);*/

  //to insert 1 document
  const insertResult = await collection.insertOne({ name: "Sultan", id: "69" });
  console.log("Inserted documents =>", insertResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
