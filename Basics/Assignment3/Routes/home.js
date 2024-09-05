const express=require('express');

const router=express.Router();

const rootDir=require('../utill/path')

const path=require('path');

const bodyParser=require('body-parser')

router.use(bodyParser.urlencoded({extended:false}));

router.get('/',(req,res,next) => {

    res.sendFile(path.join(rootDir,'view','home-page.html'))

})
router.post('/',(req,res,next) => {
    console.log(req.body);
    res.redirect('/users')

})
module.exports=router;

