const express=require('express');

const path=require('path');

const rootDir=require('../utill/path');

const router=express.Router();

router.get('/users', (req,res,next) => {

    res.sendFile(path.join(rootDir,'view','users.html'));

})
module.exports = router