const express=require("express");

const rootDir=require('../utill/path');

const path=require('path');

const adminController = require('../controllers/admin');

const router=express.Router();

const bodyParser=require('body-parser')

router.use(bodyParser.urlencoded({extended:false}));

// /admin/add-product => GET

router.get('/add-product',adminController.getAddProduct);

// /admin/products => GET
router.get('/products',adminController.getProducts);

//   /admin/add-product => POST

router.post('/add-product',adminController.postAddProduct);

router.get('/edit-product/:productId',adminController.getEditProduct);

router.post('/edit-product',adminController.postEditProduct);

router.post('/delete-product',adminController.deleteProduct)

module.exports = {
    router
}    