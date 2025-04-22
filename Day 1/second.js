console.log("Hello i am second");
function sum(a, b) {
  console.log(a + b);
}

function sub(a, b) {
  console.log(a - b);
}
module.exports = sum;
module.exports = { sum: sum, sub: sub }; //to export more than one function using key value pairs
