var express = require("express");
var app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function (req, res) {
  res.render("index");
});
// var mahasiswaController = require("./controllers/mahasiswa");
// var produkController = require("./controllers/produk");

// app.use(function (req, res, next) {
//   console.log(req.params);
//   if (req.params && req.params.nim) {
//     console.log("middleware nim = " + req.params.nim);
//   }
//   console.log("middleware nim");
//   next();
// });

// app.get("/", function (req, res, next) {
//   res.send("ulala");
//   next();
// });

// app.use("/mahasiswa", mahasiswaController);
// app.use("/produk", produkController);

// app.use(function (req, res) {
//   console.log("middleware response");
// });

// app.get("*", function (req, res, next) {
//   // TODO: res.write
//   res.status(404).send("404 Not Found!");
// });

app.listen(3001);
