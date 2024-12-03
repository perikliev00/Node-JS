const path=require('path');

const rootDir=require('../utill/path');
const shopController=require('../controllers/shop');
const isAuth = require('../middleware/is-auth');
const express=require('express');
const router=express.Router();


router.get('/' , shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId',shopController.getProduct);

router.get('/cart',isAuth,shopController.getCart);

router.post('/cart' ,isAuth,shopController.postCart);

router.post('/cart-delete-item',isAuth,shopController.postCartDeleteProducts );

router.get('/orders',isAuth,shopController.getOrders)

// // router.get('/checkout',shopController.getCheckout);

router.post('/create-order',shopController.postOrder)

router.get('/orders/:orderId',isAuth,shopController.getInvoice)

module.exports=router;