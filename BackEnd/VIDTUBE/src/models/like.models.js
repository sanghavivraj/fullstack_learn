// likes [icon:thumbs-up]{
//   _id string pk
//   comment objectId comments
//    createdAt Data
//     updatedAt Data
//     video objectId videos
//     tweet objectId tweets
//     likedBy objectId users
// }
import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
    {
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        comment: {
            type: Schema.Types.ObjectId,
            rf: "Comment"
        },
        tweet: {
            type: Schema.Types.ObjectId,
            ref: "Tweet"
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    }, { timestamps: true }
)

export const Like = mongoose.model("Like", likeSchema)