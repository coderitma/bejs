var express = require("express");
var app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function (req, res) {
  let data = {
    nama: "Yanwar",
    email: "yanwarsolah@gmail.com",
    status: true,
    hobi: ["tidur", "makan", "jail", "baca", "nonton spoiler"],
  };

  res.render("index", { data });
});

app.listen(3001);
