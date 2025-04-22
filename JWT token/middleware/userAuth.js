const jwt = require("jsonwebtoken");
const User = require("./Models/users");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token does'nt exist");
    }

    /*const { _id } = payload;
    if (!_id) {
      throw new Error("ID is missing");
    }*/
    // code likhna padege, user ko authenticate kar paauon
    const payload = jwt.verify(req.cookies.token, "Rohit@13412$");
    // console.log(payload);
    const result = await User.findById(payload._id);
    if (!result) {
      throw new Error("User doesn't exist");
    }

    req.result = result;

    next();
  } catch (err) {
    res.send("Error" + err.message);
  }
};

module.exports = userAuth;
