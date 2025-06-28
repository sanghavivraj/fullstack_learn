
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //coludinary url
            required: true
        },
        thumbnail: {
            type: String, //coludinary url
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {  // ✅ Correct spelling
            type: String,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            required: false
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, { timestamps: true }
)
videoSchema.plugin(mongooseAggregatePaginate)


export const Video = mongoose.model("Video", videoSchema)