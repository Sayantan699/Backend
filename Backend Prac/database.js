const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb+srv://coderarmy:7FHkRg9TSemYCE8F@clusterarmy.neoceen.mongodb.net/Gym"
  );
}

module.exports = main;
