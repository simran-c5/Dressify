const express = require("express");
const router = express.Router()
const multer = require("multer");
const fs = require("fs");
const path =require("path");
const upload = multer({
    dest: 'uploads/'
})

router.post("/productImageSave", upload.single('imageName'),function(req,res){
    console.log(req.file);
    const newImg = fs.readFileSync(req.file.path);
    const product_image = {
     data: newImg,
     contentType: 'image/*'
    }
    console.log(newImg);


    fs.unlinkSync(req.file.path, function(err) {
        if (err) {
            console.log(err)
        };
    })


})



router.get("/", function(req,res) {
	res.render('admin-panel');	
})
module.exports = router