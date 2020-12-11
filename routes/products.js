var express = require("express");
var router = express.Router();
var Product = require("../models/product");

router.get("/", async function (req, res, next) {
  let products = await Product.find();
  console.log(products);
  res.render("products/list", {
    title: "Course List",
    products,
  });
});
router.get("/add", async function (req, res, next) {
  res.render("products/add");
});
// store data in db
router.post("/add", async function (req, res, next) {
  let product = new Product({
    crName: req.body.crName,
    id: req.body.id,
    crDuration: req.body.crDuration,
    crFee: req.body.crFee,
  });
  await product.save();
  res.redirect("/products");
});
router.get("/edit/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  res.render("products/edit", { product });
});
router.post("/edit/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  product.crName = req.body.crName;
  product.id = req.body.id;
  product.crDuration = req.body.crDuration;
  product.crFee = req.body.crFee;
  await product.save();
  res.redirect("/products");
});
router.get("/delete/:id", async function (req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});

module.exports = router;
