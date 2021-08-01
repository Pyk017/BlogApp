const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  //lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => console.log("hello there!"));
  greet();
  greet();
  // set response header content-type
  res.setHeader("Content-Type", "text/html");

  let path = "./views";

  switch (req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "/about.html";
      res.statusCode = 200;
      break;
    default:
      path += "/404.html";
      res.statusCode = 404;
      break;
  }

  //sending html pages to the browser
  fs.readFile(path, (err, data) => {
    if (err) {
      res.write(err);
      res.end();
    } else {
      //   res.write(data);
      res.end(data);
    }
  });
});

server.listen(PORT, "localhost", () => {
  console.log(`Listening on request on Port ${PORT}`);
});
