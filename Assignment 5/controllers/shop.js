const { path } = require('chromium');
const Product = require('../models/product')
const Order = require('../models/order');
const User = require('../models/user')

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('shop/product-list', {
            prods:products,
            pageTitle: "All products",
            path: '/products',
            isAuthenticated:req.session.isLoggedIn
        })
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getProduct = (req ,res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then((product) => {
        res.render('shop/product-detail', {
            product:product,
            pageTitle: "Shop",
            path: '/',
            isAuthenticated:req.session.isLoggedIn
        });
    })
}

exports.getIndex = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('shop/index', {
            prods:products,
            pageTitle: 'Shop',
            path: '/',
            isAuthenticated:req.session.isLoggedIn
        })
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .then(user => {
        const products = user.cart.items;
        console.log(products)
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
            isAuthenticated:req.session.isLoggedIn

          });  
    })
    .catch(err => 
        console.log(err)
    )
}

exports.postCart = (req, res ,next) => {
    const prodId = req.body.productId;
    let product;
    Product.findById(prodId)
    .then(result => {
        product=result;
        return User.findById(req.session.user._id)
    })
    .then(user => {
        user.addToCart(product)
    })
    .then(result => {
        res.redirect('/cart');
    })
    }


exports.postCartDeleteProducts = (req,res,next) => {
    const prodId = req.body.productId;
    req.user
    .removeFromCart(prodId)
    .then(resolve => {
    res.redirect('/cart');
    })
    .catch(err=>console.log(err))
}

exports.getOrders = (req, res ,next) => {
    Order.find( {'user.userId' : req.session.user._id})
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders:orders,
            isAuthenticated:req.session.isLoggedIn

        });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
        isAuthenticated:req.session.isLoggedIn

    })
}

exports.postOrder = (req,res,next) => {
        req.user
        .populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items.map(i => {
                return {quantity: i.quantity, product : {...i.productId._doc} };
            })
            const order = new Order( {
                user: {
                    name:req.user.name,
                    userId:req.user._id
                },
                products:products
            });
            user.clearCart()
            return order.save()
        })
        .then(()=> {
            res.redirect('/orders')
        } )
}