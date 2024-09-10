const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods:products,
            tittle: "All products",
            path: '/products',
        })
    })
};
exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods:products,
            tittle: "Shop",
            path: '/',
        })
    })
};

exports.getCart = (req, res ,next) => {
    res.render('shop/cart', {
        path: '/cart',
        tittle: 'Your Cart'
    });
};

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        tittle: 'Checkout'
    });
};
