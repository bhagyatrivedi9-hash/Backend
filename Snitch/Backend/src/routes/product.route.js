import Router from "express"
import { identifySeller } from "../middleware/auth.middleware.js"
import multer from "multer"
import { createProductValidator } from "../validator/product.validator.js"
import {createProduct} from "../controller/product.controller.js"

const router=Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})


router.post("/create",identifySeller,upload.array("images",5),createProductValidator,createProduct)

export default router

