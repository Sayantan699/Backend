//using middle ware to remove repetetive code and for the authetication
const Auth = (req, res, next) => {
  // Its just a dummy code to authenticate the user if he/she is admin or not ...
  const token = "ABCDCEF";
  const access = token === "ABCDEF" ? 1 : 0;
  if (!access) res.status(403).send("No Permission");

  next();
};
module.exports = { Auth };
