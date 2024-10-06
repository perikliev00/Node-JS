const { path } = require('chromium');
const Product = require('../models/product')
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('shop/product-list', {
            products:products,
            pageTitle: "All products",
            path: '/products',

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
            path: '/'
        });
    })
}

exports.getIndex = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('shop/index', {
            prods:products,
            pageTitle: 'Shop',
            path: '/'
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
            products: products
          });  
    })
    .catch(err => 
        console.log(err)
    )
}

exports.postCart = (req, res ,next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        res.redirect('/cart');
    })
    // let newQuantity=1;
    // let fetchedCart;
    // req.user
    // .getCart()
    // .then(cart => {
    //     fetchedCart=cart;
    //     return cart.getProducts({where: {id:prodId}})
    // })
    // .then((products => {
    //     let product;
    //     if(products.length>0) {
    //         product=products[0];
    //     }
    //     if(product) {
    //         let oldQuantity=product.cartItem.quantity;
    //         newQuantity=oldQuantity+1
    //         return product
    //     }
    //     return Product.findByPk(prodId)
    // }))
    // .then(product => {
    //         fetchedCart.addProduct(product,{through: {quantity:newQuantity}})
    //         res.redirect('/cart');
    //     })
    // .catch(err => console.log(err))
    
    // console.log(prodId)
    // req.user
    // .getCart()
    // .then(cart => {
    //     fetchedCart =cart;
    //     return cart.getProducts({where: {id: prodId}});
    // })
    // .then(products => {
    //     let product;
    //     let fetchedCart;
    //     if(!products.lenght > 0) {
    //     const product = product[0];
    //     }
    //     let newQuantity = 1;
    //     if(product) {
    //         // ...
    //     }
    //     return Product.findByPk(prodId)
    // })
    // .then(product => {
    //         return fetchedCart.addProduct(product, {
    //          through: { quantity: newQuantity }
    //         });
    //     })
    // .catch(err => console.log(err));
    
    }


exports.postCartDeleteProducts = (req,res,next) => {
    const prodId = req.body.productId;
    return req.user
    .removeFromCart(prodId)
    .then(resolve => {
        res.redirect('/cart');
    })
    .catch(err=>console.log(err))
}

exports.getOrders = (req, res ,next) => {
    Order.find( {'user.userId' : req.user._id})
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders:orders
        });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
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
                    userId:req.user
                },
                products:products
            });
            return order.save()
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(()=> {
            res.redirect('/orders')
        } )
}