# Bun
    - Bun is a new JavaScript runtime, just like Node.js — but it's faster, more modern, and has built-in features like:

        A fast bundler

        A built-in test runner

        An HTTP server (like express in Node)

        Built-in support for TypeScript

        Faster installation (bun install)


## nodejs
    - serve() is similar to createServer() in Node.js.

## pathname 
    -pathname is the part of the URL that shows what route or page the user wants to visit.

| Property           | Example                                    | Use Case                                                       |
| ------------------ | ------------------------------------------ | -------------------------------------------------------------- |
| `url.pathname`     | `/ice-tea`                                 | ✅ Used to match routes in your server                          |
| `url.search`       | `?type=green&size=large`                   | For getting query parameters (filter, sort, etc.)              |
| `url.host`         | `localhost:3000`                           | Shows domain + port (not needed for routing)                   |
| `url.protocol`     | `http:`                                    | Shows `http:` or `https:` (not used in simple route handling)  |
| `url.href`         | `http://localhost:3000/ice-tea?type=green` | Full URL (not useful for matching specific routes)             |
| `url.searchParams` | `{type: "green"}` (object)                 | Useful if you want to handle filters or extra data sent in URL |


## routes
    - This routes include the put,get,delete, post include which we used to add see update or delete the keys in postman  

## Midlleware (import)
    -middle ware is just a function which is run between the frontend and backend.
### cros(important)
    -It allows your backend (e.g., localhost:3000) to be accessed by frontend on another origin (e.g., localhost:5173).
    -This is Cross-Origin Resource Sharing (CORS).
    -You enable or restrict frontend-backend communication.

```javascript
// ✅ 2. Body Parser Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
```
    -These lines tell Express how to handle data coming from the client.


### multer → for handling file uploads to your server.  
### cloudinary → to upload those files to cloud storage (like image hosting).  
### fs → to delete files from your local system after uploading them online.  