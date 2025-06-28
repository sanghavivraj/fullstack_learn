// comments [icon:comment]{
//   _id string pk
//   content string
//   createdAt Data
//   updatedAt Data
//   videos objectId[] videos
//   owner objectId users
// }
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
    {
        content:
        {
            type: String,
            required: true
        },
        videos: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        owner:
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    }, { timestamps: true }
)
commentSchema.plugin(mongooseAggregatePaginate)
export const Comment = mongoose.model("Comment", commentSchema)