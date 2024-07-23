const http=require('http');
const fs=require('fs');
let server=http.createServer();
server.listen(8000,'127.0.0.1',()=> {
    console.log('server listen')
})
server.on('request',(req,res) => {
    let rs= fs.createReadStream('./files/long-file.txt')
    rs.on('data',(chunk) => {
        res.write(chunk)
        res.end();
    })
    rs.on('error',(error) => {
        res.end(error.message);
    })
})