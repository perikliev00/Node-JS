const User = require('../models/user');

exports.getLogin = (req, res ,next) => {
        res.render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            isAuthenticated:req.session.isLoggedIn
        });
};
exports.postLogin = (req, res ,next) => {
    User.findOne()
    .then(user => {
        if(!user) {
        const user = new User ({
            name: "Alex",
            email: "alex@gmail.com",
            cart: {
                items: []
            }
        });
    }
    return user;
})
    .then(user => {
        req.session.user=user;
        req.session.isLoggedIn = true; 
        req.session.save((err) => {
            console.log(err);
            res.redirect('/');
        });
    })
    .catch(err => {
        console.log(err);
    })
};

exports.postLogout = async (req, res, next) => {
    await req.session.destroy(err => {
        console.log(err);
    })
    res.redirect('/');    
}