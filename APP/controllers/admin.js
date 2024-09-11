const Product = require('../models/product')

exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product', {
        tittle: 'Add Product',
        path: '/admin/add-product',
        formCSS: true,
        productsCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req,res,next) => {
    const tittle=req.body.tittle;
    const imgUrl=req.body.imgUrl;
    const description=req.body.description;
    const price=req.body.price;
    const product = new Product(tittle,imgUrl,description,price);
    product.save();
    res.redirect('/')
}

exports.getProducts = (req,res,next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            tittle: "Admin Products",
            path: "/admin/products"
        });
    });
};