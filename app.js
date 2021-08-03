const express = require("express");
const passport = require('passport');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path =require("path");
const upload = multer({
    dest: 'uploads/'
})

require('./auth/passport');
const pageRoutes = require("./apis/routes/pageroutes");
const adminRoutes = require("./apis/routes/admin_routes");
const auth = require("./apis/routes/auth");
const requireAuth = passport.authenticate("jwt", { session: false });


mongoose.connect("mongodb://localhost:27017/Dressify" ,  { useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false});

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.use('/auth',auth);
app.use("/",pageRoutes);
app.use("/admin",adminRoutes);
app.listen(4000,function(){
  console.log("server is running on port number 4000");
});