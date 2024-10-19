const express=require("express");

const rootDir=require('../utill/path');

const path=require('path');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router=express.Router();

const bodyParser=require('body-parser')

router.use(bodyParser.urlencoded({extended:false}));

// /admin/add-product => GET

router.get('/add-product',isAuth,adminController.getAddProduct);

// /admin/products => GET
router.get('/products',isAuth,adminController.getProducts);

//   /admin/add-product => POST

router.post('/add-product',isAuth,adminController.postAddProduct);

router.get('/edit-product/:productId',isAuth,adminController.getEditProduct);

router.post('/edit-product',isAuth,adminController.postEditProduct);

router.post('/delete-product',isAuth,adminController.deleteProduct)

module.exports = router