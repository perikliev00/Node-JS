const { validationErrors } = require('express-validator');
const Product = require('../models/product');
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

exports.getAddProduct = (req, res, next) => {
    console.log(req.session)
    res.render('admin/edit-product' , {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors:[]
    });
};

exports.postEditProduct = (req,res,next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice= req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const errors = validationResult(req)
    if(!errors.isEmpty()) {

        return res.status(422).render('admin/edit-product', {
             pageTitle: 'Edit Product',
             path: '/edit/add-product',
             editing: true,
             hasError: true ,
             product:{
                 title:updatedTitle,
                 imageUrl:updatedImageUrl,
                 price:updatedPrice,
                 description:updatedDesc,
                 _id:prodId
             },
             errorMessage: errors.array()[0].msg,
             validationErrors:errors.array()
         });
 
     }
    Product.findById(prodId)
    .then(product => {        
        if (product.userId.toString() !== req.user._id.toString()) {
            return res.redirect('/')
        }
        product.title=updatedTitle;
        product.price=updatedPrice;
        product.imageUrl=updatedImageUrl;
        product.description=updatedDesc;
        return product.save(). then(result => {
            console.log('Updated');
            res.redirect('/admin/products')
        })

    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteOne({ _id: prodId, userId: req.user._id})
    .then(() => {
        console.log('Product Destroyed');
        res.redirect('/admin/products')
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
}

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
     if(!editMode) {
         return res.redirect('/')
    }
    const prodId=req.params.productId;
    Product.findById(prodId)
        .then(product=> {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/edit/add-product',
            editing: editMode,
            product:product,
            hasError:false,
            errorMessage:null,
            validationErrors:[]
        });

    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
};

exports.postAddProduct =(req,res,next) => {
    const title=req.body.title;
    const imageUrl=req.file;
    const description=req.body.description;
    const price=req.body.price;
    console.log(imageUrl);
    const errors = validationResult(req)

    if(!errors.isEmpty()) {

       return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/edit/add-product',
            editing: false,
            hasError: true ,
            product:{
                title:title,
                imageUrl:imageUrl,
                price:price,
                description:description 
            },
            errorMessage: errors.array()[0].msg,
            validationErrors:errors.array()
        });

    }

    const product = new Product({
        // _id: new mongoose.Types.ObjectId('670d5899efee8a2d401bb822'),
        title:title,
        price:price,
        description:description,
        imageUrl:imageUrl,
        userId:req.session._id,
    });
    product.
    save()
    .then(result => {
        console.log("Created Product");
        res.redirect('/products');
    })
    .catch(err => {
    //     return res.status(500).render('admin/edit-product', {
    //         pageTitle: 'Add Product',
    //         path: '/admin/add-product',
    //         editing: false,
    //         hasError: true ,
    //         product:{
    //             title:title,
    //             imageUrl:imageUrl,
    //             price:price,
    //             description:description 
    //         },
    //         errorMessage: 'Data base operation failed, please try again!',
    //         validationErrors:[]
    //     });

    // })
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
    })
}

exports.getProducts = (req,res,next) => {
    Product.find({userId:req.user._id})
    .then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: "Admin Products",
            path: "/admin/products",
        });
     })
     .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
};