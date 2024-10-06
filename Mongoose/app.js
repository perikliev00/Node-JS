const express=require('express');

const path=require('path');

const bodyParser=require("body-parser");

const mongoose = require('mongoose');

const errorControler = require('./controllers/error');
// const mongoConnect = require('./utill/database').mongoConnect;

const User=require('./models/user')

const app=express();

app.set('view engine','ejs');

app.set('views','views')

const routesAdmin=require('./Routes/admin');

const routesShop=require('./Routes/shop');
// const { FORCE } = require('sequelize/lib/index-hints');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')))

app.use((req,res,next)=> {
    User.findById('670284876934513fe8827cd4')
    .then(user => {
        req.user=user;
        next();
    })
    .catch(err => {
        console.log(err);
    })
})

app.use(routesShop);

app.use('/admin',routesAdmin.router);

app.use(errorControler.get404);

mongoose
.connect('mongodb+srv://perikliev00:sztBOUCHlzp3H2Vc@cluster0.r6inv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(result => {
    User.findOne().then(user => {
        if(!user) {
        const user = new User ({
            name: "Alex",
            email: "alex@gmail.com",
            cart: {
                items: []
            }
        });
        user.save();
    }
    })
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})