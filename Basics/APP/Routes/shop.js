const path=require('path');

const rootDir=require('../utill/path');

const adminRouter=require('./admin');

const express=require('express');

const router=express.Router();

router.get('/' ,(req,res,next) => {
    const products=adminRouter.products;
    console.log(products);
    res.render('shop',{prods:products,tittle:"shop"});
    // console.log(adminRouter.products)
});


module.exports=router;