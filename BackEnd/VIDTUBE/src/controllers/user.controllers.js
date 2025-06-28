import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const genrateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        if (!user) {
            throw new ApiError(404, "There is  no user!")
        }
        const accessToken = user.genrateAccessToken()
        const refreshToken = user.genrateRefreshToken()


        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "something went wrong while genrationg access and refresh tokens");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body

    //validation
    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(404, "All fileds are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(404, "User with email or username alredy exist")
    }
    console.warn(req.files)
    const avatarLocalPath = req.files?.avatar?.[0]?.path
    const coverLocalPath = req.files?.coverImage?.[0]?.path
    if (!avatarLocalPath) {
        throw new ApiError(404, "avatar file is missing")
    }

    // const avatar = await uploadOnCloudinary(avatarLocalPath)
    // let coverImage = ""
    // if (coverLocalPath) {
    //     const coverImage = await uploadOnCloudinary(coverLocalPath)
    // }

    let avatar;
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath)
        console.log("uploded avatar", avatar);

    } catch (error) {
        console.log("Error uploading avatar", error);
        throw new ApiError(500, "Failed to upload avatar");

    }
    let coverImage;
    try {
        coverImage = await uploadOnCloudinary(coverLocalPath)
        console.log("uploded coverImage", coverImage);

    } catch (error) {
        console.log("Error uploading coverImage", error);
        throw new ApiError(500, "Failed to upload coverImage");

    }
    try {

        //extra just for error hanndling
        // console.log("Creating user with:", {
        //     fullname,
        //     avatar: avatar?.url,
        //     coverImage: coverImage?.url || "",
        //     email,
        //     password,
        //     username: username?.toLowerCase()
        // });


        //main 
        const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
        })

        const createdUser = await User.findById(user._id).select(
            "-password -refrenseToken"
        )
        if (!createdUser) {
            throw new ApiError(500, "something went wrong while register a user")
        }
        return res
            .status(201)
            .json(new ApiResponse(200, createdUser, "user registerd successfulyy"))
    } catch (error) {
        console.log("User creation failed");
        if (avatar) {
            await deleteFromCloudinary(avatar.public_id)
        }
        if (coverImage) {
            await deleteFromCloudinary(coverImage.public_id)
        }
        throw new ApiError(500, "something went wrong while register a user and images were deleted")

    }


})

const loginUser = asyncHandler(async (req, res) => {
    //get data from body
    const { email, username, password } = req.body

    //validation
    if (!password) {
        throw new ApiError(402, "Password is required");
    }

    if (!email && !username) {
        throw new ApiError(400, "Please provide either email or username");
    }



    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    //validate password
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(404, "Invalid password")
    }

    const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            200,
            { user: loggedInUser, accessToken, refreshToken }, "user looged in sucessfulyy"
        ))

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refrenseToken: undefined,
            }
        },
        { new: true }
    )
    const options = {
        hhtpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refrenseToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
})
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cokkies.refreshToken ||
        req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(404, "refresh token is reqired")
    }

    try {
        const decodeedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = await User.findById(decodeedToken?._id)

        if (!user) {
            throw new ApiError(401, "invalid refresh token")
        }
        if (incomingRefreshToken !== user?.refrenseToken) {

            throw new ApiError(401, "Invalid refresh token")
        }
        const options = {
            hhtpOnly: true,
            secure: process.env.NODE_ENV === "production"
        }
        const { accessToken, refreshToken, newRefreshToken } = await genrateAccessAndRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: newRefreshToken
                    },
                    "Access token refreshd successfully"
                ));


    } catch (error) {
        throw new ApiError(500, "sonething went wrong while refreshing access token")
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id)

    const isPasswordValid = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordValid) {
        throw new ApiError(401, "old password is incorrect")
    }

    user.password = newPassword

    await user.save({ validateBeforeSave: false })

    return res.status(200).json(new ApiResponse(200), {}, "Password chnage succesfully")

})
const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "Current User Detailed"))
})
const upadateAccountDeatails = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body
    if (!fullname) {
        throw new ApiError(400, "fullname is required")
    }
    if (!email) {
        throw new ApiError(400, "Email is required")
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname,
                email: email
            }
        },
        { new: true }
    ).select("-password -refreshToken")
    return res.status(200).json(new ApiResponse(200, user, "account Detailed updates succesfully"))


})
const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar.url) {
        throw new ApiError(500, "something went wrong while uploading avatar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id, {
        $set: {
            avatar: avatar.url
        }
    }, { new: true }
    ).select("-password -refrenseToken")

    return res.status(200).json(new ApiResponse(200, user, "avatar update successfully"))
})


const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path
    if (!coverImageLocalPath) {
        throw new ApiError(400, "file is required")
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!coverImage.url) {
        throw new ApiError(500, "something went wrong sometimes while uploading")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id, {
        $set: {
            coverImage: coverImage.url
        }
    }, { new: true }
    ).select("-password -refreshToken")

    return res.status(200).json(new ApiResponse(200, user, "coverImage update successfully"))
})

const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params
    if (!username?.trim) {
        throw new ApiError(400, "usernmae is required")
    }
    const channel = await User.aggregate(
        [
            {
                $match: {
                    username: username?.toLowerCase()
                }
            },
            {
                $lookup: {
                    from: "subscription",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscriber",
                }
            },
            {
                $lookup: {
                    from: "subscription",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscriberTo"
                }
            },
            {
                $addFields: {
                    subscribersCount: {
                        $size: "$subscribers"
                    },
                    channelsSubscribeToCount: {
                        $size: "$subscriberedTo"
                    },
                    isSubscribed: {
                        $cond: {
                            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                            then: true,
                            else: false
                        }
                    }
                }
            }, {
                //project only the necessary data
                $project: {
                    fullname: 1,
                    username: 1,
                    avatar: 1,
                    subscribersCount: 1,
                    channelsSubscribeToCount: 1,
                    isSubscribed: 1,
                    coverImage: 1,
                    email: 1
                }
            }
        ]
    )

    if (!channel?.length) {
        throw new ApiError(404, "channel not found")
    }
    return res.status(200).json(new ApiResponse(200,
        channel[0],
        "Channel profile fetched successfully"
    ))

})

const getWatchHistroy = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistroy",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullname: 1,
                                        usernmae: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])
    return res.status(200).json(new ApiResponse(200, user[0]?.watchHistroy, "Watch history fetched successfulyy"))
})

export {
    registerUser, loginUser, refreshAccessToken, logoutUser, changeCurrentPassword, getCurrentUser, upadateAccountDeatails, updateUserAvatar, updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistroy
}