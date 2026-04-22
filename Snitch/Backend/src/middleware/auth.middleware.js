import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

export const identifySeller= async (req, res, next) => {
 
   const token = req.cookies.token 

   if(!token){
    return res.status(401).json({message:"Unauthorized"})
   }
   const decoded= jwt.verify(token,config.JWT_SECRET)

   if(!decoded){
  return res.status(401).json({message:"Unauthorized"})
   }
    try{
        const user = await userModel.findById(decoded.id)

        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        if(user.role!=='seller'){
            return res.status(403).json({message:"Forbidden"})
        }
        req.user=user
        next()
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}

