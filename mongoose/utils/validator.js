//API level validation
const validator = require("validator");

function valid(data) {
  const mandatoryfield = ["firstName", "gender", "age"];
  const IsAllowed = mandatoryfield.every((k) => Object.keys(data).includes(k));

  if (!IsAllowed) throw new Error("Field Missing");

  if (!validator.isStrongPassword(data.password))
    throw new Error("Weak passwrod");
}
module.exports = valid;
