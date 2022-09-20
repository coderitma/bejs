var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("mengakses daftar produk");
  next();
});

router.get("/:kodebarang", function (req, res) {
  console.log(req.params.kodebarang);
  res.send("anda mengakses barang " + req.params.kodebarang);
});

router.get("/:kategori/:tag", function (req, res) {
  console.log(req.params.kategori);
  res.send(
    "anda mengakses kategori barang " +
      req.params.kategori +
      " " +
      "dan mengakses tag barang " +
      req.params.tag
  );
});

router.get("/:data1/:data2/:operator", function (req, res) {
  let data1 = parseInt(req.params.data1);
  let data2 = parseInt(req.params.data2);
  let operator = req.params.operator;

  if (operator === "add") {
    res.send(`hasilnya adalah = ${data1 + data2}`);
  } else if (operator === "min") {
    res.send(`hasilnya adalah = ${data1 - data2}`);
  } else if (operator === "mul") {
    res.send(`hasilnya adalah = ${data1 * data2}`);
  } else if (operator === "div") {
    res.send(`hasilnya adalah = ${data1 / data2}`);
  }
  return;
});

module.exports = router;
