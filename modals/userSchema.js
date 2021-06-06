const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
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
    }
})


userSchema.pre('save',async function(next){
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash;
    next();
})
userSchema.methods.isPasswordValid = async function(password){
    user = this;
    let result ;
    const com = await bcrypt.compare(password, user.password);
    return com;
}

module.exports = mongoose.model('user',userSchema);