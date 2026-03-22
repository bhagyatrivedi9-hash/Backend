import { registerValidator } from "../validator/auth.validator.js";
import { register,login,getMe,verifyEmail } from "../controller/auth.controller.js";
import { Router } from "express";
import {authUser} from "../middleware/auth.middleware.js";

 export const router = Router();

    router.post("/register", registerValidator, register)
    router.post("/login", login)
    router.get("/verify-email", verifyEmail)
    router.get("/get-me", authUser, getMe)