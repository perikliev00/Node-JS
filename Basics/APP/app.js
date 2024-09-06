const express=require('express');

const path=require('path');

const bodyParser=require("body-parser");

const app=express();

app.set('view engine','pug');

app.set('views','views')

const routesAdmin=require('./Routes/admin');

const routesShop=require('./Routes/shop');

app.use(express.static(path.join(__dirname,'public')))

app.use('/admin',routesAdmin.router);

app.use(routesShop);


app.use((req,res,next) => {

    res.status(404).sendFile(path.join(__dirname,'views','page-not-found.html'));

})

app.listen(3000);