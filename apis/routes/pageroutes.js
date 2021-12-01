const express = require("express");
const router = express.Router();

// router.get("/description", function(req,res) {
// 	res.render('index1');
// })
router.get("/aboutus", function(req,res) {
	res.render('aboutus');
})
router.get("/compose", function(req,res) {
	res.render('composePage');
})
router.get("/", function(req,res) {
	res.render('index');
	
})
router.get("/home", function(req,res) {
	res.render('home');
	
})
router.get("/products", function(req,res) {
	res.render('products');
})
router.get("/description/:id", function(req,res) {
	res.render('description');	
})
router.get("/cart", function (req, res) {
	res.render('cart');
})

module.exports = router;