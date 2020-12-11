var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  image: {
    type: String,
  },
  instrument: String,
  price: String,
  cloudinary_id: {
    type: String,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
