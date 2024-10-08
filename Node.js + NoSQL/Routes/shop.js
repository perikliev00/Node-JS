const path=require('path');

const rootDir=require('../utill/path');

const shopController=require('../controllers/shop');

const express=require('express');

const router=express.Router();


router.get('/' , shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId',shopController.getProduct);

router.get('/cart',shopController.getCart);

router.post('/cart' ,shopController.postCart);

router.post('/cart-delete-items',shopController.postCartDeleteProducts );

router.get('/orders',shopController.getOrders)

// router.get('/checkout',shopController.getCheckout);

router.post('/create-order',shopController.postOrder)

module.exports=router;