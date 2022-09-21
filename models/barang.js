var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mydb");

var BarangSchema = mongoose.model(
  "Barang",
  mongoose.Schema({
    nama: String,
    harga: Number,
    status: Boolean,
    data: [{a: String}]
  })
);

var BarangSchema = mongoose.model(
  "Barang",
  mongoose.Schema({
    nama: String,
    harga: Number,
    status: Boolean,
    // data: [{a: String}]
  })
);

exports.getTotalBarang = (batas, querySearch) => {
  return new Promise((resolve, reject) => {
    BarangSchema.count(querySearch, function (err, response) {
      resolve(Math.round(response / batas));
    });
  });
};

exports.BarangSchema = BarangSchema;
