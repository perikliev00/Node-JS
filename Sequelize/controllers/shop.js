const { path } = require('chromium');
const Product = require('../models/product')
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll()
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
    Product.findByPk(prodId)
    .then((product) => {
        res.render('shop/product-detail', {
            product:product,
            pageTitle: "Shop",
            path: '/'
        });
    })
}

exports.getIndex = (req, res, next) => {
    Product.findAll()
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
    .then(cart => {
        const products=cart.getProducts();
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
    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //       const cartProducts = [];
    //       for (product of products) {
    //         const cartProductData = cart.products.find(
    //           prod => prod.id === product.id
    //         );
    //         if (cartProductData) {
    //           cartProducts.push({ productData: product, qty: cartProductData.qty });
    //         }
    //       }
    //       res.render('shop/cart', {
    //         path: '/cart',
    //         pageTitle: 'Your Cart',
    //         products: cartProducts
    //       });
    //     });
    //   });
    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for(let product of products) {
    //             const cartProductData= cart.products.find(prod => prod.id === product.id);
    //             if(cartProductData) {
    //                 cartProducts.push({productData: product, qty:cartProductData.qty})
    //             }
    //         }
    //         res.render('shop/cart', {
    //             path: '/cart',
    //             pageTitle: 'Your Cart',
    //             products:cartProducts
    //         });
    //     })
    // })


exports.postCart = (req, res ,next) => {
    const prodId = req.params.productId;
    console.log(prodId)
    req.user
    .getCart()
    .then(cart => {
        fetchedCart =cart;
        return cart.getProducts({where: {id: prodId}});
    })
    .then(products => {
        let product;
        let fetchedCart;
        if(!products.lenght > 0) {
        const product = product[0];
        }
        let newQuantity = 1;
        if(product) {
            // ...
        }
        return Product.findByPk(prodId)
    })
    .then(product => {
            return fetchedCart.addProduct(product, {
             through: { quantity: newQuantity }
            });
        })
    .catch(err => console.log(err));
    
    }


exports.postCartDeleteProducts = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId,product.price);
        res.redirect('/cart');
    })
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
