const { path } = require('chromium');
const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
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
    // Product.findAll({where:{id:prodId}})
    // .then((product) => {
    //     res.render('shop/product-detail', {
    //         product:product[0],
    //         pageTitle: product[0].title,
    //         path: '/'
    //     });
    // })
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
    Product.fetchAll()
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
    .getCart()
    .then(products => {
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
    .deleteById(prodId)
    .then(resolve => {
        res.redirect('/cart');
    })
    .catch(err=>console.log(err))
}

exports.getOrders = (req, res ,next) => {
    req.user.getOrders({include:['products']})
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
    let fetchedCart;
    req.user
    .getCart()
    .then(cart => {
        fetchedCart=cart;
        return cart.getProducts()
    })
    .then(products => {
        return req.user
        .createOrder()
        .then(order => {
            return order.addProduct(
                products.map(product => {
                    product.orderItem = { quantity: product.cartItem.quantity };
                    return product;
                })
            )
        })
        .catch(err => console.log(err));
    })
    .then( result => {
        fetchedCart.setProducts(null);
        } )
    .then( result => {
        res.redirect('/order');
    } )
    .catch(err=>console.log(err))
}