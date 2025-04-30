const validator = require("validator");

function validuser(data) {
  const mandatoryfield = ["firstname", "lastname", "gender"];
  const isAllowed = mandatoryfield.every((k) => Object.keys(data).includes(k));

  if (!isAllowed) throw new Error("Fields Missing");
  if (!validator.isEmail(data.emailid)) throw new Error("Invalid Email");

  if (!validator.isStrongPassword(data.password))
    throw new Error("Weak Password");

  if (!(data.firstname.length >= 3 && data.firstname.length <= 20))
    throw new Error("Name should have at least 3 and at most 20 characters");
}

module.exports = validuser;
