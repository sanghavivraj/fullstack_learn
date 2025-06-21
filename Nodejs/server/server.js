const http = require('http')
const fs =require('fs')
const path = require('path')

const port = 3000

const server = http.createServer((req, res ) => {
    const filepath = path.join(__dirname,req.url === '/' ? "index.html" : req.url);

    console.log(filepath);
    
    const extName =  String(path.extname(filepath).toLowerCase())


    const mimeTypes = {
        '.html':'text/html',
        '.css':'text/css',
        '.js':'tetx/javascript',
        '.png':'text/png',
    }
    const contentType = mimeTypes[extName] || 'application/octet-stream';

    fs.readFile(filepath, (err, content) => {
        if(err){
            if(err.code === 'ENOENT'){
                res.writeHead(404,{"content-type":"text/html"});
                res.end("404: file Not Found Brooo");
            }
        }else {
            res.writeHead(200,{'content-type':contentType})
            res.end(content,'utf-8')
        }
    })
});

server.listen(port,  ()=> {
    console.log(`server is listing on port 3000 `);
    
})