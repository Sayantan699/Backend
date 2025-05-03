const main = require("./database");
const { user } = require("./model/user");
const validuser = require("./utils/validateuser");
//const validateuser = require("./utils/validateuser");
const bcrypt = require("bcrypt");
const express = require("express");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authrouter = require("./routes/authapi");
const userrouter = require("./routes/userapi");

const app = express();

app.use(express.json());
app.use(cookieparser());

app.use("/auth", authrouter);
app.use("/user", userrouter);

app.get("/register", async (req, res) => {
  const ans = await user.find({});
  res.send(ans);
});

// app.post("/register", async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt(10); // 10 is a good default
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     req.body.password = hashedPassword;
//     await user.create(req.body);
//     /*const mandatoryfield = ["firstname", "lastname", "gender"]; //this is api level validation using these to save the multiple time crud operation in databse thus saving the cost of using database
//     const isAllowed = mandatoryfield.every((k) =>
//       Object.keys(req.body).includes(k)
//     );*/
//     validuser(req.body);
//     /*if (isAllowed) {
//       res.status(200).send("User registered Successfully!!");
//     } else throw new Error("Mandatory Field Missing");*/
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const people = await user.findOne({ emailid: req.body.emailid }); // await here

//     if (!people) {
//       return res.status(404).send("User not found");
//     }

//     if (req.body.emailid !== people.emailid) {
//       return res.status(401).send("Invalid email");
//     }

//     const isAllowed = await bcrypt.compare(req.body.password, people.password);

//     if (!isAllowed) {
//       return res.status(401).send("Invalid password");
//     }

//     //token
//     /*const token = jwt.sign(
//       { _id: people._id, emailid: people.emailid },
//       "SayantanKey",
//       { expiresIn: 10 }
//     ); //Payload and key... payload should not contain any important credentianls as its only encoded 64bit format*/

//     const token = people.getjwt();

//     res.cookie("token", token); // optional
//     console.log(req.cookies);
//     res.send("Login Successful");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send(err.message);
//   }
// });

app.get("/check", async (req, res) => {
  //Use Postman or a browser to perform the /login request.Then, make another request (e.g., to /register or a test route like /check) and log req.cookies

  try {
    // validate the user first

    const payload = jwt.verify(req.cookies.token, "SayantanKey");
    console.log(payload);
    const result = await user.find();

    res.send(result);
  } catch (err) {
    res.send("Error" + err.message);
  }
});

// app.get("/user/:id", async (req, res) => {
//   try {
//     const result = await user.findById(req.params.id);
//     res.send(result);
//   } catch (err) {
//     res.send("Error" + err.message);
//   }
// });

// app.delete("/user/:id", async (req, res) => {
//   try {
//     const result = await user.findByIdAndDelete(req.params.id);
//     res.send(result);
//   } catch (err) {
//     res.send("Error" + err.message);
//   }
// });

// app.patch("/user", async (req, res) => {
//   //API level validation
//   try {
//     const { _id, ...update } = req.body; //destructuing the object to extract the id and update the following given in req.body based upon the unique id
//     const result = await user.findByIdAndUpdate(_id, update, {
//       //we have to manually validate while updating
//       runValidators: true,
//     });
//     res.send("Update succesfully");
//   } catch (err) {
//     res.send("Error" + err.message);
//   }
// });

main()
  .then(() => {
    console.log("Connected to Database");
    app.listen(process.env.PORT, () => {
      console.log("In 5900 port");
    });
  })
  .catch((err) => console.log(err));
