var express = require("express");
var app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use("/public", express.static("public"));
app.use("/images", express.static("images"));

app.get("/", function (req, res) {
  let data = {
    nama: "Yanwar",
    email: "yanwarsolah@gmail.com",
    status: true,
    content: "konten",
    hobi: ["tidur", "makan", "jail", "baca", "nonton spoiler"],
  };

  res.render("index", { data });
});

app.listen(3001);
