var express = require("express");
var router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
var Product = require("../models/product");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let products = await Product.find();
  console.log(products);
  res.render("products/list", {
    title: "Musical Instruments Shop",
    products,
  });
});
router.get("/add", async function (req, res, next) {
  res.render("products/add");
});
// store data in db
router.post("/add", upload.single("image"), async function (req, res, next) {
  const result = await cloudinary.uploader.upload(req.file.path);
  let product = new Product({
    image: result.secure_url,
    instrument: req.body.instrument,
    price: req.body.price,
    cloudinary_id: result.public_id,
  });
  await product.save();
  res.redirect("/products");
});
router.get("/delete/:id", async function (req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});
router.get(
  "/edit/:id",
  upload.single("image"),
  async function (req, res, next) {
    let product = await Product.findById(req.params.id);
    await cloudinary.uploader.destroy(product.cloudinary_id);
    res.render("products/edit", { product });
  }
);
router.post(
  "/edit/:id",
  upload.single("image"),
  async function (req, res, next) {
    let product = await Product.findById(req.params.id);
    const result = await cloudinary.uploader.upload(req.file.path);
    product.image = result.secure_url;
    product.instrument = req.body.instrument;
    product.price = req.body.price;
    product.cloudinary_id = result.public_id;
    await product.save();
    res.redirect("/products");
  }
);

module.exports = router;
