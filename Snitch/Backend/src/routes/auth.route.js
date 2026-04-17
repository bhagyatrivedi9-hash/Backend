import { registerValidator ,loginValidator} from "../validator/auth.validator.js";
import { registerUser,loginUser,googleCallback } from "../controller/auth.controller.js";
import {Router} from "express"
import passport from "passport";

import config from "../config/config.js";

const router= Router()

router.post("/register",registerValidator,registerUser)
router.post("/login",loginValidator,loginUser)

router.get("/google", (req, res) => {
  // Handle Google OAuth route
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
});
router.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: config.NODE_ENV == "development" ? "http://localhost:5173/login" : "/login"
    }),
    googleCallback,
)
export default router