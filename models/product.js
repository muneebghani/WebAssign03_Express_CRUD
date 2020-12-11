var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  crName: String,
  id: Number,
  crDuration: Number,
  crFee: Number,
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
