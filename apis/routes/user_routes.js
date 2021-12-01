const express = require("express");
const router = express.Router();
const Product = require("../../modals/products-schema");

router.get("/getProductDetail", async (req, res) => {
    let id = req.query.id;
    let user = req.user;
    console.log(id,user,"line 6");
    Product.findOne({_id:id}, function(err,doc){
        if (err) {
            res.json({
                status: "failure",
                message: "Product Not found",
            })
        }
        else if(doc){
            res.json({
                status: "success",
                message: "product found successfully",
                data: doc,
            })
        }
    });
})

module.exports = router;
