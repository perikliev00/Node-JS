const express=require('express');
const router=express.Router();
const homeRouter=require('./home');

router.use('/users',(req,res,next) => {
    res.render('users',{
        users:homeRouter.arrUsers,
        tittle:"Users Page"
    })
})
module.exports=router
