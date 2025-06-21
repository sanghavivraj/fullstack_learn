# NodeJs

## Synchronous vs Asynchronous
### Synchronous:-  
    -Code is excute line b line.
    -Each operation waits for the previous one to finish before continue.  
    -slower if there are somthing that task takes time.
    exmaple.
    const data = fs.readFileSync("file name");

### Asynchronous:-
    -code runs without waiting.
    -times-consuming tasks run in the backgroud.  
    -Allows other tasks to run waile waiting for one to finish.
    -Good for performance, escpecially in the web servers.


| 🔧 Concept                     | 💬 Meaning / Skill you're learning         |
| ------------------------------ | ------------------------------------------ |
| `fs` module                    | Reading/writing files in Node.js           |
| `JSON.stringify()` / `parse()` | Converting objects to strings and back     |
| `process.argv`                 | Handling user input from command line      |
| `try...catch`                  | Handling errors safely (like file missing) |
| Modularity                     | Breaking code into small functions         |
| CLI commands (`node todo.js`)  | Building terminal-based tools              |


## Core Concept:- 

### http Modlue:- 
    -it create a web server.  
    -Used to handle incoming HTTP request 

    const http = require('http');
    const server = http.createServer((req, res) => { ... });

### fs Module:- 
    -module for reading and writing files.
    To load and serve files like HTML,CSS, JS from your server.

    fs.readFile(filepath, (err, content) => { ... });


## MIME Types
    What they are: Tell the browser what type of content you're sending (HTML, CSS, JS, images).
