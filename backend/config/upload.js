import { CloudinaryStorage } from'multer-storage-cloudinary'
import multer from 'multer'
import cloudinary from './cloudinary.js'

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "products",
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
    }
})

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})
