import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"

async function sendTokenResponse(user, res) {

    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET)
    res.cookie("token",token)

    res.status(200).json({
     message:"User registered successfully",
        success:true,
        user:{
            email:user.email,
            contact:user.contact,
            fullname:user.fullname,
            role:user.role

        }
    })

}

export const registerUser= async (req,res)=>{
    const {email,contact,password,fullname,role}= req.body

    try{
        const isregistered= await userModel.findOne({
            $or:[{
                email:email,
                contact:contact
            }]
        })
        if(isregistered){
            return res.status(400).json({
                message:"User already regitered with this email or contact number"
            })
        }
        const user = await userModel.create({
            email,contact,password,fullname,role
        })
        await sendTokenResponse(user, res)
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Internal server error"
        })
    }

}
