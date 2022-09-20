var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mydb");

var BarangSchema = mongoose.model(
  "Barang",
  mongoose.Schema({
    nama: String,
    harga: Number,
    status: Boolean,
  })
);

module.exports = BarangSchema;
