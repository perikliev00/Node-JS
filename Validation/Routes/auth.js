const express=require('express');
const { check,body } = require('express-validator');
const router=express.Router();
const authContoller = require('../controllers/auth');
const User = require('../models/user');
const bcrypt = require('bcryptjs')

router.get('/login' ,authContoller.getLogin);

router.get('/signup' , authContoller.getSignup);

router.post('/login' , [
    body('email','Email or password is incorect')
    .isEmail()
    .custom((value , { req }) => {
        return User.findOne( {email:value} )
        .then(userDoc => {
            if(!userDoc) {
            return Promise.reject('E-Mail or password is not correct ,please  a different one.')
            }
            return userDoc
    })
        .then(user => {
            return bcrypt
                .compare(req.body.password, user.password)
                .then(doMatch => {
                    if(!doMatch) {
                        return Promise.reject('E-Mail or password is not correct ,please  a different one.')
                    }
                })

        })
    }),
    body('confirmPassword','Password field is empthy')
    .notEmpty()
    .custom((value , { req }) => {
        if(value != req.body.password) {
            throw new Error('Password dont match')
        }
        return true
    })
] ,authContoller.postLogin);

router.post('/signup', 
    [check('email','Please enter valid email.')
        .isEmail()
        .withMessage('Please enter valid email.')
        .custom((value, { req })=> {
        //     if (value === 'test@test.com') {
        //       throw new Error('This email address is forbidden')
        // }
        // return true;
        return User.findOne( {email:value} )
        .then(userDoc => {
            if(userDoc) {
            return Promise.reject('E-Mail exists alredy, please pick a different one.')
            }
    })
}),
    body(
        'password',
        'Please enter a password with only numbers and text and at least 5 charectars'
    )
        .isLength({ min:5 })
        .isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error('Passwords have to match.');
        }
        return true;
    })   
],authContoller.postSignup)

router.post('/logout' ,authContoller.postLogout);


module.exports=router;