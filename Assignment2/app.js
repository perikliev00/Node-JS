const express=require('express');

const app=express();

app.use('/user',(req,res,next) => {
    res.send('<h1>Hello from user page!</h1>')
})

app.use('/',(req,res,next) => {
    res.send('<h1>Hello from Experss!</h1>')    
})
app.listen(3000);