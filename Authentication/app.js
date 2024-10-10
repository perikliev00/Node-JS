const express=require('express');
const path=require('path');
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorControler = require('./controllers/error');
const User=require('./models/user')
const csrf = require('csurf');
const flash = require('connect-flash')

const MONGODB_URI = 'mongodb+srv://perikliev00:sztBOUCHlzp3H2Vc@cluster0.r6inv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app=express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})
const csrfProtection = csrf();

app.set('view engine','ejs');
app.set('views','views')

const routesAdmin=require('./Routes/admin');
const routesShop=require('./Routes/shop');
const routesAuth=require('./Routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')))
app.use(
    session({ secret: 'my secret', resave: false, saveUninitialized: false,store:store })
)
app.use(csrfProtection);
app.use(flash());

app.use((req,res,next) => {
    if(!req.session.user) {
        return next()
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err))
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next()
})

app.use(routesShop);
app.use('/admin',routesAdmin);
app.use(routesAuth);
app.use(errorControler.get404);

mongoose
.connect(MONGODB_URI)
.then(result => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})