
import 'dotenv/config'
import express from 'express'
import logger from "./logger.js";
import morgan from "morgan";


const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);

let teaData = []
let nextId = 1;

// add new tea
app.post('/teas', (req, res) => {
    const { name, price, quty } = req.body
    const newTea = { id: nextId++, name, price, quty }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//  tea list 
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})


// tea using id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find((tea => tea.id === parseInt(req.params.id)))
    if (!tea) {
        return res.status(404).send("oops something is wrong")
    }
    res.status(200).send(tea);
})


//update tea using id
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(tea => tea.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("oops there is no tea!")
    }
    const { name, price, quty } = req.body
    tea.name = name
    tea.price = price
    tea.quty = quty
    res.status(200).send(tea)
})


//delete tea using id

app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send("tea not found")
    }
    teaData.splice(index, 1)
    res.status(204).send("deleted");
})

app.listen(port, () => {
    console.log(`server is run on the  port 3000..`);

})