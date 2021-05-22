const express = require("express");
const app = express();
const port = 3000;

const loggingMiddleWare = (request, response, next) => {
  const currentTime = new Date();
  console.log(`Request received at: ${currentTime}`);
  response.setHeader("X-Codaisseur-Time", currentTime);
  next();
};

const failRandomlyMiddleware = (request, response, next) => {
  if (Math.random() * 2 >= 1) {
    next();
  } else {
    response.status(500).end();
  }
};

app.use(loggingMiddleWare);

app.get("/", failRandomlyMiddleware, (req, res) => res.send("Hello"));
app.get("/foo", (request, response) => response.send("hello nagehan"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
