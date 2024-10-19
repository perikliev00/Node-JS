const User = require('../models/user');

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')

exports.getLogin = (req, res ,next) => {
        let message = req.flash('error');
        if(message.length>0) {
            message = message[0]
        } else {
            message = null;
        }
        res.render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: message
        });
};

exports.getSignup = (req ,res, next) => {
    let message = req.flash('error-register');
        if(message.length>0) {
            message = message[0]
        } else {
            message = null;
        }
    res.render('auth/signup' , {
        path: '/signup',
        pageTitle:'SignUp',
        errorMessage:message
    })
}

exports.postLogin = (req, res ,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    User.findOne( {email:email} )
        .then(user => {
            if(!errors.isEmpty()) {
                console.log(errors.array());
                return res.status(422).render('auth/login' , {
                    path: '/login',
                    pageTitle:'Login',
                    errorMessage:errors.array()[0].msg
                })
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if(doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    } else {
                        req.flash('error', 'Invalid email or password');
                        return res.redirect('/login');
                    }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                })
        })
        
};

exports.postLogout = async (req, res, next) => {
    await req.session.destroy(err => {
        console.log(err);
    })
    res.redirect('/');    
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('auth/signup' , {
            path: '/signup',
            pageTitle:'SignUp',
            errorMessage:errors.array()[0].msg
        })
    }
             bcrypt
            .hash(password,12)  
            .then(hashedPassword => {
                const user = new User({
                    email:email,
                    password: hashedPassword,
                    cart: { items: [] }
                });
                return user.save();
            })
            .then(result => {
                res.redirect('/login')
            })  
        .catch( err => {
            console.log(err);
        } )

};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/')
    })
}