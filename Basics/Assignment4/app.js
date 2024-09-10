const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const homePage=require('./Routes/home')
const usersPage=require('./Routes/users')
const app=express();

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine' ,'ejs');

app.set('views', 'views')

app.use(homePage.router);

app.use(usersPage);

app.listen(3000);

