const readline= require('readline');
const fs = require('fs');
const http= require('http');
const url= require('url');
/// Step 1:Create a server
const html = fs.readFileSync('./Tameplate/index.html','utf-8')
let products=JSON.parse(fs.readFileSync('./Data/product.json','utf-8'));
let productListHtml=fs.readFileSync('./Tameplate/product-list.html','utf-8');
let productHtmlArray=products.map((prod)=> {
    let output=productListHtml.replace('{{IMAGE}}',prod.productImage);
    output=output.replace('{{%NAME%}}',prod.name);
    output=output.replace('{{%MODELNO%}}',prod.modelNumber);
    output=output.replace('{{%SIZE%}}',prod.size);
    output=output.replace('{{%CAMERA%}}',prod.camera);
    output=output.replace('{{%IMAGE%}}',prod.productImage);
    output=output.replace('{{%PRICE%}}',prod.price);
    output=output.replace('{{%COLOR%}}',prod.color);
    output=output.replace('{{%ID%}}',prod.id);
    return output;
})
const server=http.createServer((request,response)=> {
    let {query,pathname:path}=url.parse(request.url,true);
    //let path=request.url;
    console.log(productHtmlArray.join(','));
    console.log(query);
    if(path==='/'||path.toLocaleLowerCase()==='/home') {
        response.writeHead(200,{
            'Content-Type':'text/html',
            'my-header': 'Hello.world'
        });
        response.end(html.replace('{{%CONTENT%}}','You are in home page'));
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
        if(!query.id) {
        let productResponseHtml= html.replace('{{%CONTENT%}}',productHtmlArray.join(','))
        response.writeHead(200,{'Content-Type':'text/html',})
        response.end(productResponseHtml);
        } else {
            response.end('This is produce with id='+query.id)
        }
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