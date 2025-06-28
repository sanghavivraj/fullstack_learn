import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    let error = err
    console.log("Error middleware...", error);

    // if (!(error instanceof ApiError)) {
    //     const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500

    //     const message = error.message || "something went wrong"
    //     error = new ApiError(statusCode, message, error?.errors || [], err.stack)
    // }
    const response = {
        statusCode: 400,
        message: error.message,
        // ...ApiError(process.NODE_ENV === "development" ? { stack: error.stack } : {})
    }
    return res.status(400).json(response)
}

export { errorHandler }