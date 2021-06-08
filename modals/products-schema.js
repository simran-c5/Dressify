const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    product_category:{
        type:String,
        required:true
    },
    product_description:{
        type:String,
        required:true
    },
    product_fabric:{
        type:String,
    },
    product_color:{
        type:String,
    },
    product_brand:{
        type:String,
    }
})

module.exports = mongoose.model('products',productSchema);