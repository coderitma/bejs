var express = require("express");
var { BarangSchema, getTotalBarang } = require("../models/barang");
var router = express.Router();

router.get("/", function (req, res) {
  let halaman = parseInt(req.query.page);
  let batas = parseInt(req.query.limit);
  let currentPage = halaman > 1 ? halaman * batas - batas : 0;
  let querySearch = {};
  if (req.query && req.query.harga) {
    querySearch.harga = parseInt(req.query.harga);
  }
  if (req.query && req.query.nama) {
    querySearch.nama = req.query.nama;
  }

  BarangSchema.find(querySearch, async function (err, response) {
    const total = await getTotalBarang(batas, querySearch);
    let path = decodeURI(req.originalUrl).split("?")[0];
    let prev = halaman > 1 ? halaman - 1 : null;
    let next = halaman + 1 <= total ? halaman + 1 : null;
    console.log(halaman + 1 < total, total);
    let y = Object.assign([], response);

    for (var i = 0; i < y.length; i++) {
      console.log(y[i]);
      y[i].detail = path + "/" + y[i]._id;
    }

    let result = {
      batas,
      halaman,
      currentPage,
      total,
      prev,
      next,
      // yt: path + "/909u0898s9uadd9079s7ud",
      data: y,
    };
    res.json(result);
  })
    .limit(batas)
    .skip(currentPage);
});

router.post("/create", function (req, res) {
  console.log(req.body);
  var barangBaru = new BarangSchema(req.body);

  barangBaru.save(function (err, BarangSchema) {
    if (err) {
      res.send("error!");
    } else {
      res.status(201).json(req.body);
    }
  });
});

router.get("/detail/:id", function (req, res) {
  BarangSchema.findById(req.params.id, function (err, response) {
    res.json(response);
  });
});

router.put("/edit/:id", function (req, res) {
  let id = req.params.id;
  let data = req.body;

  BarangSchema.findByIdAndUpdate(id, data, function (err, response) {
    res.json(data);
  });
});

router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;

  BarangSchema.findByIdAndRemove(id, function (err, response) {
    try {
      throw Error("alamak, error!");
      res.status(204).json({});
    } catch (e) {
      res.status(400).json({ message: "Maap aplikasi anda error" });
    }
  });
});

module.exports = router;
