import {body,validationResult} from "express-validator"

export const registerValidator=[
    body("email").isEmail().withMessage("Invalid email address"),
    body("contact").isMobilePhone().withMessage("Invalid contact number"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body("fullname").isLength({min:5,max:30}).withMessage("Full name must be between 5 and 30 characters long"),
    body("role").isIn(["buyer", "seller"]).withMessage("Invalid role")
]