var express = require("express");

var bodyParser = require("body-parser");
var barangController = require("./controllers/barang");
var app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/barang", barangController);

app.listen(3001);
