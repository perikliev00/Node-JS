const express=require('express');
const bodyParser=require("body-parser");
const app=express();
const routesAdmin=require('./Routes/admin');
const routesShop=require('./Routes/shop');

app.use(routesAdmin);

app.use(routesShop);

app.listen(3000);