const readline= require('readline');
const fs = require('fs');
const http= require('http');
/// Step 1:Create a server
const html = fs.readFileSync('./Tameplate/index.html','utf-8')
const server=http.createServer((request,response)=> {
    response.end(html)
    console.log('A new request recived')
    //console.log(request);
});
/// Step 2:Start the server
server.listen(8000,'127.0.0.1',() => {
    console.log('server has started')
})