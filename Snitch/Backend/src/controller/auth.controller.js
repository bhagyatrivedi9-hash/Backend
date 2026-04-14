import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

async function sendTokenResponse(user, res) {
  console.log("JWT_SECRET:", config.JWT_SECRET) 
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
    console.log(req.body)
    const {email,contact,password,fullname,isSeller}= req.body

    try{
        const isregistered= await userModel.findOne({
            $or:[{email},{contact}]
        })
        if(isregistered){
            return res.status(400).json({
                message:"User already regitered with this email or contact number"
            })
        }
        const user = await userModel.create({
            email,contact,password,fullname,role:isSeller? "seller":"buyer"
        })
        await sendTokenResponse(user, res)
    }catch(err){
             console.error("FULL ERROR:", err.message)  
        console.error("ERROR NAME:", err.name)   
        res.status(500).json({
            message:"Internal server error"
        })
    }

}

export const loginUser= async (req,res)=>{
    const {email,password}=req.body

    const user= await userModel.findOne({email})
    if(!user){
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }
   const isMatch = await user.isValidPassword(password);
     if(!isMatch){
        return res.status(401).json({
            message:"Invalid credentials"
        })
     }
     await sendTokenResponse(user,res);
   
}

export const googleCallback = async (req, res) => {
    const { id, displayName, emails, photos } = req.user
    const email = emails[ 0 ].value;
    const profilePic = photos[ 0 ].value;


    let user = await userModel.findOne({
        email
    })

    if (!user) {
        user = await userModel.create({
            email,
            googleId: id,
            fullname: displayName,
        })
    }


    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", token)

    res.redirect("http://localhost:5173/")
}