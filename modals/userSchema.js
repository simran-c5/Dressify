const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        // required:true
    },
    product_category: {
        type: String,
        // required:true
    },
    product_price: {
        type: Number
    },
    product_image: {
        data: Buffer,
        contentType: String
    },
    product_description: {
        type: String,
        // required:true
    },
    product_fabric: {
        type: String,
    },
    product_color: {
        type: String,
    },
    product_brand: {
        type: String,
    }
})


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number
    },
    street:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    pincode:{
        type:Number
    },
    state:{
        type:String
    },
    cart: [productSchema]
})


userSchema.pre('save',async function(next){
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash;
    next();
})
userSchema.methods.isPasswordValid = async function(userpassword){
    user = this;
    let result ;
    const com = await bcrypt.compare(userpassword, user.password);
    return com;
}

module.exports = mongoose.model('user',userSchema);