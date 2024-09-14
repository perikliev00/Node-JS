const express=require('express');

const path=require('path');

const bodyParser=require("body-parser");

const errorControler = require('./controllers/error');

const app=express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine','ejs');

app.set('views','views')

const routesAdmin=require('./Routes/admin');

const routesShop=require('./Routes/shop');

app.use(express.static(path.join(__dirname,'public')))

app.use(routesShop);

app.use('/admin',routesAdmin.router);


app.use(errorControler.get404);

app.listen(3000);