import mongoose from "mongoose"

const productSchema= new mongoose.Schema({
   
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    seller:{
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    images:[
{
    url:{
        type:String,
        required:true
    }
}
    ],
    price:{
     amount:  {
            type: Number,
            required:true
        },
        currency:{
            type: String,
            required:true,
            enum: ["USD", "EUR", "GBP", "JPY", "INR"],
            default: "INR"
        }
    }
     
},
{timestamps:true
})

const productModel= mongoose.model("product",productSchema)


export default productModel