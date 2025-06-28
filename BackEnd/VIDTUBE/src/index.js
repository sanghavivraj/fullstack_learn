import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from "./db/index.js";

// import { connectDB } from "./db/index.js"


// app.use((req, res, err) => {
//     console.log("Error middleware.......", err)
// })


dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 8001

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);

        })
    })
    .catch((err) => {
        console.log("MongoDB connection error ", err);

    })

