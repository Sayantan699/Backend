const validator = require("validator");

function validuser(data) {
  const mandatoryfield = ["firstname", "lastname", "gender"];
  const isAllowed = mandatoryfield.every((k) => Object.keys(data).includes(k));

  if (!isAllowed) throw new Error("Fields Missing");
  if (!validator.isEmail(data.emailId)) throw new Error("Invalid Email");

  if (!validator.isStrongPassword(data.password))
    throw new Error("Week Password");

  if (!(data.firstName.length >= 3 && data.firstName.length <= 20))
    throw new Error("Name should have atleast 3 char and atmost 20 char");
}

module.exports = validuser;
