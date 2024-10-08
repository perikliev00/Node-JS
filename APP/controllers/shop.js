const { path } = require('chromium');
const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods:products,
            pageTitle: "All products",
            path: '/products',

        })
    })
};

exports.getProduct = (req ,res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId,product => {
        console.log(product);
    })
    console.log(prodId);
    Product.findById(prodId,product => {
        res.render('shop/product-detail',{
            prod:product,
            pageTitle: product.title,
            path:'/products'
        })
    })
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods:products,
            pageTitle: products.title,
            path: '/',
        })
    })
};

exports.getCart = (req, res ,next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(let product of products) {
                const cartProductData= cart.products.find(prod => prod.id === product.id);
                if(cartProductData) {
                    cartProducts.push({productData: product, qty:cartProductData.qty})
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products:cartProducts
            });
        })
    })
};

exports.postCart = (req, res ,next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId,(product) => {
            Cart.addProduct(prodId,product.price);
    });
    })
    res.redirect('/cart');
}

exports.getOrders = (req, res ,next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}
