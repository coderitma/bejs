var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  console.log("mahasiswa dipanggil");
  res.send("mengakses daftar mahasiswa");
  next();
});

router.get("/:nim", function (req, res) {
  console.log("nim mahasiswa = " + req.params.nim);
  res.send("mengakses nim mahasiswa");
});

module.exports = router;
