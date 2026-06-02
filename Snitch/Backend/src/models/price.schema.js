import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
   
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ["USD", "EUR","INR", "GBP", "JPY", "AUD", "CAD"],      
            default: "INR"
        }
    
}, {
    _id: false,
    _v: false
});
    export default priceSchema;