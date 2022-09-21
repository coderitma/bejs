var express = require("express");
var { BarangSchema, getTotalBarang } = require("../models/barang");
var router = express.Router();

router.get("/", function (req, res) {
  let halaman = parseInt(req.query.page);
  let batas = parseInt(req.query.limit);
  let currentPage = halaman > 1 ? halaman * batas - batas : 0;
  let querySearch = {
    harga: parseInt(req.query.harga),
    nama: req.query.nama,
  };

  BarangSchema.find(querySearch, async function (err, response) {
    const total = await getTotalBarang(batas, querySearch);

    let prev = halaman > 1 ? halaman - 1 : null;
    let next = halaman + 1 < total ? halaman + 1 : null;

    let result = {
      batas,
      halaman,
      currentPage,
      total,
      prev,
      next,
      data: response,
    };
    res.json(result);
  })
    .limit(batas)
    .skip(currentPage);
});

router.get("/:id", function (req, res) {
  BarangSchema.findById(req.params.id, function (err, response) {
    // console.log(req.originalUrl);
    res.render("form", { data: response });
  });
});

router.post("/edit/:id", function (req, res) {
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
    data: {
      x: 2,
    },
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
