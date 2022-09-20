var express = require("express");
var BarangSchema = require("../models/barang");
var router = express.Router();

router.get("/", function (req, res) {
  BarangSchema.find(function (err, response) {
    console.log(response);
    res.render("tampil_data", { data: response });
  });
});

router.get("/:id", function (req, res) {
  BarangSchema.findById(req.params.id, function (err, response) {
    console.log(response);
    res.render("form", { data: response });
  });
});

router.post("/:id", function (req, res) {
  let id = req.params.id;
  let status = false;

  if (req.body.status === "1") {
    status = true;
  }

  var barang = {
    nama: req.body.nama,
    harga: req.body.harga,
    status,
  };

  BarangSchema.findByIdAndUpdate(id, barang, function (err, response) {
    console.log(response);
    res.redirect("/barang");
  });
});

router.get("/create", function (req, res) {
  res.render("form");
});

router.post("/create", function (req, res) {
  console.log(req.body);
  let status = false;
  if (req.body.status === "1") {
    status = true;
  }

  var barangBaru = new BarangSchema({
    nama: req.body.nama,
    harga: req.body.harga,
    status,
  });

  barangBaru.save(function (err, BarangSchema) {
    if (err) {
      res.send("error!");
    } else {
      res.redirect("/barang/create");
    }
  });
  // res.send(req.body);
});

router.get("/delete/:id", function (req, res) {
  let id = req.params.id;
  BarangSchema.findByIdAndRemove(id, function (err, response) {
    console.log(response);
    res.redirect("/barang");
  });
});

module.exports = router;
