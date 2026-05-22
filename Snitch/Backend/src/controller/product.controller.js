import { uploadImage } from "../services/storage.service.js";
import productModel from "../models/product.model.js"

export const createProduct= async (req,res)=>{

  const {title,description,priceAmount,priceCurrency}=req.body
  const images= req.files
  const seller=req.user
 console.log(req.files)

    const imageUrl= await Promise.all(
      images.map(async(image)=>{
        const url= await uploadImage({
          buffer:image.buffer,
          fileName:image.originalname
        })
        return url
      })
    )

    const product =await productModel.create({
        title,
        description,
        price:{ amount:priceAmount, currency:priceCurrency},
        images:imageUrl,
        seller:seller._id
    })

   

  
    res.status(201).json({
        message: "Product created successfully",
        success: true,
        product
    })
}

export const getSellerProdcuts= async (req,res)=>{
   const seller=req.user

  const products= await productModel.find({
  seller: seller._id
  })

   res.status(200).json({
   message:"Prodcuts fetched successfully",
   success:true,
    seller,
   products
    })
}

