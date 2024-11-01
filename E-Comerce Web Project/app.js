const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const Mongo_URI = 'mongodb+srv://perikliev00:T5DFj9oXLnqy4bzf@e-comerce.esrls.mongodb.net/?retryWrites=true&w=majority&appName=E-COMERCE';
const strore = new MongoDBStore({
    uri:Mongo_URI,
    collection: 'sessions'
})



const app = express();

app.use(express.static('public'))

app.get('/' ,(req,res,next)=> {
   res.sendFile(path.join(__dirname,'public/views','index.html'))
})

 mongoose
 .connect(Mongo_URI)
 .then(result => {
    app.listen(3000);
    console.log('app started')
 })
 .catch(err => {
    console.log(err);
 })
