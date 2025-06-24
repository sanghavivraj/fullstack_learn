import{serve} from 'bun'
serve({
    fetch(request){
        const url = new URL(request.url);
        if(url.pathname === '/')
        {
            return new Response('hello Ice Tea', {status: 200})
        }else if(url.pathname === '/ice-tea'){
            return new Response('Thnaks For chossing Ice-Tea it its good for you', {status:200});
        }
        else{
            return new Response("Oops There is something wrong!",{status:404});
        }
    },
    port:3000,
    hostname:'127.0.0.1'
})