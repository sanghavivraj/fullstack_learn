const http = require('http')

const hostname ='127.0.0.1';
const port =3000

const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.statusCode=200
        res.setHeader('content-Type','text/plain')
        res.end('hello ice tea')
    }else if(req.url === '/ice-tea')
    {
        res.statusCode=200
        res.setHeader('content-Type','text/plain')
        res.end('Thnaks for choosing ice-tea')
    } else
    {
        res.statusCode=404
        res.setHeader('content-Type','text/plain')
        res.end('oops something want wrong!')
    }
})

server.listen(port,hostname,()=> {
    console.log(`server is lising at http://${hostname}:
        ${port}`);
    
})