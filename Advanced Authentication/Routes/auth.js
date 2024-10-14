const express=require('express');
const router=express.Router();
const authContoller = require('../controllers/auth');

router.get('/login' ,authContoller.getLogin);

router.get('/signup' , authContoller.getSignup);

router.post('/login' ,authContoller.postLogin);

router.post('/signup', authContoller.postSignup)

router.post('/logout' ,authContoller.postLogout);


module.exports=router;