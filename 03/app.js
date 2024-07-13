const readline= require('readline');
const fs = require('fs');
const http= require('http');
/// Step 1:Create a server
const html = fs.readFileSync('./Tameplate/index.html','utf-8')
const server=http.createServer((request,response)=> {
    let path=request.url;
    if(path==='/'||path.toLocaleLowerCase()==='/home') {
        response.end('You are in home page')
    } else if (path.toLocaleLowerCase()=== '/about') {
        response.end('You are in about page');
    } else if(path.toLocaleLowerCase()==='/contact') {
        response.end('You are in contact page');
    } else {
        response.end('Error 404: Page not found')
    }
});
/// Step 2:Start the server
server.listen(8000,'127.0.0.1',() => {
    console.log('server has started')
})