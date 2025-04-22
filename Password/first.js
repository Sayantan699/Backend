const bcrypt = require("bcrypt");
const password = "Sayantan69";

async function Hashing() {
  const salt = await bcrypt.genSalt(10);
  //const hashpass = await bcrypt.hash(password, 10); // it also adds salt the hashset and 10 represents number of rounds i.e more round more complexity;.
  const hashpass = await bcrypt.hash(password, salt);

  const ans = await bcrypt.compare(password, hashpass);
  console.log(salt);
  console.log(hashpass);
}
Hashing();
