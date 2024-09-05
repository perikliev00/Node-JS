const express=require('express');

const app=express();

const path=require('path')

const routeHome=require('./Routes/home')

const routeUsers=require('./Routes/user');

app.use(express.static(path.join(__dirname,'public')))

app.use(routeHome);

app.use(routeUsers);

app.listen(3000);