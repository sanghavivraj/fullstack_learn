import mongoose from "mongoose";
import { Comment } from "../models/comment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.models.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const comments = await Comment.find({ video: videoId })
        .populate("owner", "usernmae avatar")
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

    const totalComment = await Comment.countDocuments({ video: videoId })

    return res
        .status(200)
        .json(new ApiResponse(200,
            {
                comments,
                page: pageNumber,
                totalPages: Math.ceil(totalComment / limitNumber),
            }, "Comment fetch succesfully"
        ))
})

const addComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { content } = req.body;

    if (!content) {
        throw new ApiError(404, "comment content is required");
    }

    const video = await Video.findById(videoId);
    console.log("Checking video:", video);

    if (!video) {
        throw new ApiError(404, "video is not found");
    }

    const comment = await Comment.create({
        content,
        videos: videoId, // ✅ correct field name
        owner: req.user._id
    });

    return res.status(200).json(new ApiResponse(200, comment, "comment add succesfully"))
})

const updateComment = asyncHandler(async (req, res) => {
    // const { videoId } = req.params;
    const { commetnId } = req.params;
    const { content } = req.body;

    if (!content) {
        throw new ApiError(402, "there is no content")
    }
    const comment = await Comment.findById(commetnId)
    if (!comment) {
        throw new ApiError(404, "there is no error")

    }
    if (comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "you are not authorized to update this comment");
    }
    comment.content = comment;
    await comment.save();

    return res.status(200).json(new ApiError(200, comment, "comment update succesfully "))

})

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.parmas;
    const { content } = req.body;

    // if(!content)
    // {
    //     throw new ApiError(400,"there is no content")
    // }
    const comment = await Comment.findById(commetnId);
    {
        throw new ApiError(404, "comment not found");
    }
    if (comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(405, "you are not authorized to delete the commnet")
    }
    await comment.deleteOne();

    return res.status(200).json(new ApiResponse(200, null, "comment deleted successfully"))

})

export { getVideoComments, addComment, updateComment, deleteComment }