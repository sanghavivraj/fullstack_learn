import { Video } from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/user.models.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";


// const getAllVideo = asyncHandler(async (req, res) => {
//     const { page = 1, limit = 10, query, sortBy = "createdAt", sortType = "desc", userId } = req.body;

//     const filter = {};
//     // if (!query) {
//     //     throw new ApiError(404, "please fill the query ");
//     // }
//     // if(!userId)
//     // {
//     //     throw new ApiError(404,"useId is must!")
//     // }

// })



const publishAVideo = asyncHandler(async (req, res) => {
    console.log("📽️ publishAVideo route hit");
    // try {
    const { title, description } = req.body;

    if (!req.files || !req.files.videoFile || !req.files.videoFile[0]) {
        throw new ApiError(404, "Video file is required");
    }

    const videoFilePath = req.files.videoFile[0].path;
    const thumbnailPath = req.files.thumbnail?.[0]?.path;

    // Upload video to Cloudinary
    const uploadedVideo = await uploadOnCloudinary(videoFilePath, "vidtube/videos", "video");
    if (!uploadedVideo || !uploadedVideo.secure_url) {
        throw new ApiError(500, "Video upload failed");
    }

    // Upload thumbnail if provided
    let uploadedThumbnail = null;
    if (thumbnailPath) {
        uploadedThumbnail = await uploadOnCloudinary(thumbnailPath, "vidtube/thumbnails", "image");
    }

    // Create new video document
    const newVideo = await Video.create({
        title,
        description,
        videoFile: uploadedVideo.secure_url,   // ✅ Match with model
        thumbnail: uploadedThumbnail.secure_url, // if thumbnail is required
        duration: 300, // optional hardcoded for now
        owner: req.user._id
    });


    return res.status(200).json(
        new ApiResponse(200, newVideo, "Video published successfully")
    );
    // }
    // catch (e) {
    //     console.log("Error in publishing the video....", e)
    // }
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId).populate("owner", "usernmae avatar");

    if (!video) {
        throw new ApiError(404, "video not found")

    }
    return res.status(200).json(new ApiResponse(200), "video fetched successfully");
})

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType = "desc", userId } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const filter = {}

    if (query) {
        filter.title = {
            $regex: query,
            $options: "i"
        };
    }

    if (userId) {
        filter.owner = userId;
    }

    const sortOption = []
    sortOption[sortBy] = sortType === "asc" ? 1 : -1;

    const totalVideos = await Video.countDocuments(filter);

    const videos = await Video.find(filter)
        .populate("owner", "username avatar")
        .sort("sortOption")
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)

    return res
        .status(200)
        .json(new ApiResponse(200, {
            videos,
            page: pageNumber,
            totalPages: Math.ceil(totalVideos / limitNumber),
        }, "videos fetched successfully"))

})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description } = req.body;

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "video not found");
    }

    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "your are allowed to update the video");
    }

    const updateData = {}
    if (title) updateData.title = title;
    if (description) updateData.description = description;

    if (req.file) {
        if (video.thumbnail_public_id) {
            await deleteFromCloudinary(video.thumbnail_public_id)
        }
        const uploadedThumbnail = await uploadOnCloudinary(req.file.path, "vidtube/thumbnails", "image");
        if (!uploadedThumbnail) {
            throw new ApiError(500, "thumbnail upload failed")
        }

        updateData.thumbnail = uploadedThumbnail.secure_url;
        updateData.thumbnail_public_id = uploadedThumbnail.public_id;
    }

    const updateVideo = await Video.findByIdAndUpdate(videoId, updateData, { new: true });
    return res.status(200).json(new ApiResponse(200, updateVideo, "video update succesfully"))

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.parmas

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(404, "video not found")

    }

    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "you are not allowed to delete the video")
    }
    if (video.public_id) {
        await deleteFromCloudinary(video.public_id)
    }
    if (video.thumbnail_public_id) {
        await deleteFromCloudinary(video.thumbnail_public_id)
    }

    await video.findByIdAndUpdate(videoId);


    return res.status(200).json(new ApiResponse(200, "video deleted successfully"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(404, "video not found")
    }
    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(404, "you are not authroze to update this video")
    }

    video.isPublished = !video.isPublished;

    return res.status(200)
        .json(new ApiResponse(200,
            video,
            `video is now ${video.isPublished ? "published" : "unpublished"}`
        ))
})

export { publishAVideo, getVideoById, getAllVideos, updateVideo, deleteVideo, togglePublishStatus }