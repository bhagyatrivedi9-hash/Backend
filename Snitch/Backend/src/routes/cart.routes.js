import {Router} from "express"
import {identifyUser} from "../middleware/auth.middleware.js"
import {validateAddToCart,validateIncrementQuantity} from "../validator/cart.validator.js"
import {addToCart,getCart,incrementQuantity,decrementQuantity} from "../controller/cart.controller.js"
const router= Router()


router.post("/add/:productId/:variantId",identifyUser,validateAddToCart,addToCart)

router.get("/", identifyUser, getCart)

router.patch("/quantity/increment/:productId/:variantId",identifyUser,validateIncrementQuantity,incrementQuantity)

router.patch("/quantity/decrement/:productId/:variantId",identifyUser,validateIncrementQuantity,decrementQuantity)

export default router