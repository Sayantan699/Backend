const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url == "/") res.end("Response from Server");
  else if ((req.url = "/contact")) res.end("I am in contact");
  else if ((req.url = "/about")) res.end("I am in about");
});
server.listen(4000, () => {
  console.log("I am listening at port 4000");
});
