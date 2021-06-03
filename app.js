const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path =require("path");
const upload = multer({
    dest: 'uploads/'
})
const pageRoutes = require("./apis/routes/pageroutes")
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.use("/",pageRoutes)
app.listen(3000,function(){
  console.log("server is running on port number 3000");
});