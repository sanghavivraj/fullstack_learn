import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv"

dotenv.config()

// 🔧 Configuring Cloudinary with credentials from .env file
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


/**
 * ✅ Uploads a file (image/video) to Cloudinary
 * 
 * @param {string} localFilePath - The path to the local file to upload
 * @param {string} folder - The folder name in Cloudinary (default: "vidtube")
 * @param {string} resourceType - Type of file: "image", "video", "auto" (default: "auto")
 * @returns {object|null} - Cloudinary response object or null if failed
 */

const uploadOnCloudinary = async (localFilePath, folder = "vidtube", resourceType = "auto") => {
    try {
        // console.log("cloudinary config:", {
        //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        //     api_key: process.env.CLOUDINARY_API_KEY,
        //     api_secret: process.env.CLOUDINARY_API_SECRET
        // });
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(
            localFilePath, {
            resource_type: resourceType,
            folder
        }
        )
        console.log("File uploaded on cloudinary.File src:" + response.url);
        //once the file is uploded , we would like to delete it from our server
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        console.log("error on clouinary", error);
        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        console.log("delete from clodinary, public Id: ", publicId);

    } catch (error) {
        console.log("Error delting from cloudinary", error);
        return null
    }
}

export { uploadOnCloudinary, deleteFromCloudinary }