const express = require("express");
const router = express.Router()
const multer = require("multer");
const fs = require("fs");
const path =require("path");
const Product = require("../../modals/products-schema");
const User= require("../../modals/userSchema");

const upload = multer({
    dest: 'uploads/'
})
router.get("/", function(req,res) {
	res.render('admin-panel');	
})
router.get("/admin", function(req,res) {
	res.render('admin');	
})
router.post("/adminAddProductDetails", function(req,res){
    console.log(req.body);
    const product = new Product({
        product_name:req.body.productName,
        product_category:req.body.productCategory, 
        product_price:req.body.productPrice, 
        product_description:req.body.productDescription,
        product_fabric:req.body.productFabric,
        product_color:req.body.productColor,
        product_brand:req.body.productBrand
    });
console.log("testing finding error");
    product.save((err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result)
            res.json({
                status: "success",
                data: result
            });
        }

    });
});

router.get("/getproductdetail", function (req, res) {
    console.log(req.body,"gsjdfsfdsfjslfjds");
    Product.find({}, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.json({
                status: "success",
                data: docs
            });
        }

    });
});

router.post("/productImageSave", upload.single('imageName'),function(req,res){
    
    console.log(req.body.detailId);
    const newImg = fs.readFileSync(req.file.path);
    const product_image = {
     data: newImg,
     contentType: 'image/*'
    }
    console.log(newImg);
    Product.findOneAndUpdate({_id:req.body.detailId},{product_image}).then((product)=>{
        console.log(product);
        // if(err){
        //     console.log(err);
        // }
        res.redirect("/admin");
        // res.json({
        //     status:"success",
        //     message:"picture saved successfully"
        // })
    });

    fs.unlinkSync(req.file.path, function(err) {
        if (err) {
            console.log(err)
        };
    })


})

router.delete('/deleteDetail', function (req, res) {
    console.log(req.body);
    Product.deleteOne({ _id: req.body.id }, (err, docs) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({
                status: "success",
                data: docs
            });
        }
    });
});
router.post("/adminEditProductDetails", (req, res) => {
    const data = req.body;
    console.log("confirm");
    Product.findOneAndUpdate({ _id: data.id }, { product_name: data.productName , product_category: data.productCategory, product_price: data.productPrice, product_description: data.productDescription,product_fabric: data.productFabric,product_color: data.productColor,product_brand: data.productBrand }, (err, docs) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({
                status: "success",
                data: docs
            });
        }
    });


});

router.get("/getuserinfo",function (req, res) {
    console.log("cheaking");
    User.find({}, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.json({
                status: "success",
                data: docs
            });
        }

    });
});



module.exports = router