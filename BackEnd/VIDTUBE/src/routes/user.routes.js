import { Router } from "express";
import {
    registerUser,
    logoutUser,
    loginUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    getUserChannelProfile,
    upadateAccountDeatails,
    updateUserAvatar,
    updateUserCoverImage,
    getWatchHistroy
} from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()


//secured routes
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

router.route("/login").post(loginUser)
router.route("/reresh-token").post(refreshAccessToken)

//secured routes

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/update-account").patch(verifyJWT, upadateAccountDeatails)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
router.route("/history").get(verifyJWT, getWatchHistroy)



export default router