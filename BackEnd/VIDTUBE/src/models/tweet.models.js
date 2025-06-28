
// tweets [icon:twitter]{
//   _id string pk
//   owner objectId users
//   content string
//   createdAt Data
//   updatedAt Data

// }
import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    }, { timestamps: true }
)

export const Tweet = mongoose.model("Tweet", tweetSchema);