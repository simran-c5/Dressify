const express = require("express");
const router = express.Router()

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
router.get("/cake", function(req,res) {
	res.render('cake');
	
})
router.get("/description", function(req,res) {
	res.render('description');
	
})

module.exports = router