const readline= require('readline');
const fs = require('fs');
const http= require('http');
/// Step 1:Create a server
const html = fs.readFileSync('./Tameplate/index.html','utf-8')
let products=JSON.parse(fs.readFileSync('./Data/product.json','utf-8'));
const server=http.createServer((request,response)=> {
    let path=request.url;
    if(path==='/'||path.toLocaleLowerCase()==='/home') {
        response.writeHead(200,{
            'Content-Type':'text/html',
            'my-header': 'Hello.world'
        });
        response.end(html.replace('{{%CONTENT%}}','You are in home page'))
    } else if (path.toLocaleLowerCase()=== '/about') {
        response.writeHead(200,{
            'Content-Type':'text/html',
            'my-header': 'Hello.world'
        })
        response.end(html.replace('{{%CONTENT%}}','You are in about page'));
    } else if(path.toLocaleLowerCase()==='/contact') {
        response.writeHead(200,{
            'Content-Type':'text/html',
            'my-header': 'Hello.world'
        });
        response.end(html.replace('{{%CONTENT%}}','You are in contact page'));
    } else if(path.toLocaleLowerCase()==='/product') {
        response.writeHead(200,{'Content-Type':'application/json',})
        response.end('You are in product page');
        console.log(products);
    } else {
        response.writeHead(404,{
            'Content-Type':'text/html',
            'my-header': 'Hello.world'
        });
        response.end(html.replace('{{%CONTENT%}}','Error:404'))
    }
});
/// Step 2:Start the server
server.listen(8000,'127.0.0.1',() => {
    console.log('server has started')
})