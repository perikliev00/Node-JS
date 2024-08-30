const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res) => {
    const url = req.url;
    if(url === '/') {
        res.write('<html>');
        res.write('<body>')
        res.write('<h1>Hello World</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="message"><button>Submit</button></form>')
        res.write('</body>');
        res.write('</html>');
        return res.end()
    }
    if(url === '/create-user') {
        const body=[];
        req.on('data',(chunk) => {
            body.push(chunk);
        })
        return req.on('end', () => {
            const parseBody=Buffer.concat(body).toString();
            const message=parseBody.split('=')[1];
            console.log(message);
            fs.writeFile('message.txt',message,(err)=> {
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            });
        })
    }
    if(url === '/user') {
        res.write('<html>');
        res.write('<body><ul><li>user 1</li><li>user 2</li><li>user 3</li><li>user 4</li></ul></body>');
        res.write('</html>');
        return res.end();
    }
})
server.listen(3000);