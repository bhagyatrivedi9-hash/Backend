import { registerValidator } from "../validator/auth.validator.js";
import { registerUser } from "../controller/auth.controller.js";
import {Router} from "express"

const router= Router()

router.post("/register",registerValidator,registerUser)


export default router