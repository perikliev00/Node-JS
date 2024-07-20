const readline= require('readline');
const fs = require('fs');
const http= require('http');
const url= require('url');
/// Step 1:Create a server
const html = fs.readFileSync('./Tameplate/index.html','utf-8')
let products=JSON.parse(fs.readFileSync('./Data/product.json','utf-8'));
let productListHtml=fs.readFileSync('./Tameplate/product-list.html','utf-8');
let productDetailsHtml=fs.readFileSync('./Tameplate/product-details.html','utf-8');
function replaceHtml(template,product) {
    let output=template.replace('{{IMAGE}}',product.productImage);
    output=output.replace('{{%NAME%}}',product.name);
    output=output.replace('{{%MODELNO%}}',product.modelNumber);
    output=output.replace('{{%MODELNAME%}}',product.modeName)
    output=output.replace('{{%SIZE%}}',product.size);
    output=output.replace('{{%CAMERA%}}',product.camera);
    output=output.replace('{{%IMAGE%}}',product.productImage);
    output=output.replace('{{%PRICE%}}',product.price);
    output=output.replace('{{%COLOR%}}',product.color);
    output=output.replace('{{%ID%}}',product.id);
    output=output.replace('{{%ROM%}}',product.ROM);
    output=output.replace('{{%DESC%}}',product.Description);
    return output;
}
const server=http.createServer((request,response)=> {
    let {query,pathname:path}=url.parse(request.url,true);
    //let path=request.url;
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
        let productHtmlArray=products.map((prod) =>  {
            return replaceHtml(productListHtml,prod)
        })
        console.log(productHtmlArray);
        let productResponseHtml= html.replace('{{%CONTENT%}}',productHtmlArray.join(' '))
        response.writeHead(200,{'Content-Type':'text/html'})
        response.end(productResponseHtml);
        } else {
            let prod=products[query.id];
            let producsDetailsRespone=replaceHtml(productDetailsHtml,prod)
            response.end(html.replace('{{%CONTENT%}}',producsDetailsRespone))
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