const express = require("express");
const fs = require("fs");
const { destiny } = require("./database");
const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.use("/", express.static(__dirname + "/public"));