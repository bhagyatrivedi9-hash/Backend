import {Router} from "express"
import {identifyUser} from "../middleware/auth.middleware.js"
import {validateAddToCart} from "../validator/cart.validator.js"
import {addToCart,getCart} from "../controller/cart.controller.js"
const router= Router()


router.post("/add/:productId/:variantId",identifyUser,validateAddToCart,addToCart)

router.get("/", identifyUser, getCart)




export default router