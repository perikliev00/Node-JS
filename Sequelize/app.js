const express=require('express');

const path=require('path');

const bodyParser=require("body-parser");

const errorControler = require('./controllers/error');

const sequelize = require('./utill/database');

const Product= require('./models/product');

const User= require('./models/user');

const Cart = require('./models/cart');

const CartItem = require('./models/cart-item');

const Order = require('./models/order');

const OrderItem = require('./models/order-item')

const app=express();

app.set('view engine','ejs');

app.set('views','views')

const routesAdmin=require('./Routes/admin');

const routesShop=require('./Routes/shop');
const { FORCE } = require('sequelize/lib/index-hints');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')))

app.use((req,res,next)=> {
    User.findByPk(1)
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

Product.belongsTo(User, { constraints:true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through:OrderItem});

sequelize
  .sync()
  // .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    const cart=user.createCart();
    return cart
  }) 
  .then(cart => {
    // console.log(user);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });