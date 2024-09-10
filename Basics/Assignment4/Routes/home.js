const express=require('express');
const bodyParser=require('body-parser');
const router=express.Router();

router.use(bodyParser.urlencoded({extended:false}));

const arrUsers = [];

router.get('/',(req,res,next) => {
    res.render('home',{
        tittle:'Home Page',
    })
})

router.post('/',(req,res,next) => {
    console.log(req.body.user);
    arrUsers.push(req.body.user)
    res.redirect('/users')
})

module.exports = {
    router,
    arrUsers
}
