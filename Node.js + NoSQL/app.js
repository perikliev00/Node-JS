const express=require('express');

const path=require('path');

const bodyParser=require("body-parser");

const errorControler = require('./controllers/error');
const mongoConnect = require('./utill/database').mongoConnect;

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
    User.findById('66fc32e972b823a9a2b519e8')
    .then(user => {
        req.user= new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err => {
        console.log(err);
    })
})

app.use(routesShop);

app.use('/admin',routesAdmin.router);

app.use(errorControler.get404);

// sequelize
//   .sync()
//   // .sync()
//   .then(result => {
//     return User.findByPk(1);
//     // console.log(result);
//   })
//   .then(user => {
//     if (!user) {
//       return User.create({ name: 'Max', email: 'test@test.com' });
//     }
//     return user;
//   })
//   .then(user => {
//     const cart=user.createCart();
//     return cart
//   }) 
//   .then(cart => {
//     // console.log(user);
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });

mongoConnect( () => {
  app.listen(3000);

} )