const auth = (req, res, next) => {
  const token = "abcdef";
  const access = token === "abcdef" ? 1 : 0;
  if (!access) {
    res.status(403).send("No Permission");
  }

  next();
};

module.exports = auth;
