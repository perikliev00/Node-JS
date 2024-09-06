const express=require("express");

const rootDir=require('../utill/path');

const path=require('path');

const bodyParser=require('body-parser');

const router=express.Router();

const products=[];

router.use(bodyParser.urlencoded({extended:false}));

//   /admin/add-product => GET

router.get('/add-product' ,(req,res,next) => {
    res.sendFile(path.join(rootDir,'views','add-product.html'))
});

//   /admin/add-product => POST

router.post('/add-product',(req,res,next) => {
    console.log(req.body);
    products.push({tittle:req.body.tittle});
    res.redirect('/');
})

module.exports = {
    router,
    products
}