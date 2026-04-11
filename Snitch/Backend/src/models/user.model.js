import mongoose from "mongoose"
import bcyrpt from "bcrypt"
const userSchema= new mongoose.Schema({
  email:{
    type:String,
    required: true,
  },
  contact:{
    type:String,
    required: true,
  },
  password:{
     type:String,
    required: true,
  },
  fullname:{
     type:String,
    required: true,
  },
  role:{
    type:String,
    enum:["buyer","seller"],
    default:"buyer"
    
  }
})

const userModel= mongoose.model("user",userSchema)

userModel.pre("save",async function(next){
  const hash= await bcyrpt.hash(this.password,10)
  this.password=hash
  next()
})
userModel.methods.isValidPassword= async function (password){
  return await bcyrpt.compare(password,this.password)
}
export default userModel