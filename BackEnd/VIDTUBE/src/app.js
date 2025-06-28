import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

// import routers
import healthcheckRouter from "./routes/healthcheck.routes.js"
import userRouter from "./routes/user.routes.js"
import { errorHandler } from "./middlewares/error.middlewares.js";
import videoRoutes from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";


const app = express()
app.use(
    cors({
        origin: process.env.CROS_ORGIN,
        credentials: true
    })
)
//command middleware
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


//routes
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRoutes)
app.use("/api/v1/comments", commentRouter)


app.use(errorHandler)
export { app }