
import productModel from "../models/product.model.js"
import cartModel from "../models/cart.model.js"
import {stockOfVariant} from "../dao/proudct.dao.js"

export const addToCart= async(req,res)=>{

const {productId,variantId}= req.params
const {quantity}= req.body
const user= req.user

const product = await productModel.findOne({
    _id: productId,
    "variants._id": variantId
})

if(!product){
    return res.status(404).json({message: "Product or variant not found"})
}

const stock= await productStock(productId,variantId)

const cart= ( await cartModel.findOne({user: user._id})) || await cartModel.create({user: user._id})

const isProductAlreadyInCart= cart.items.some(item=> item.product.toString()=== productId && item.variant.toString()=== variantId)


if (isProductAlreadyInCart){

    const currentQuantity= cart.items.find(item=> item.product.toString()=== productId && item.variant.toString()=== variantId).quantity
  
    if(currentQuantity + quantity > stock){
        return res.status(400).json({ message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
                success: false})
    }
    await cartModel.findOneAndUpdate(
        {_id: cart._id, "items.product": productId, "items.variant": variantId},
        {$inc: {"items.$.quantity": quantity}},
        {new: true}
    )
    return res.status(200).json({message: "Cart updated successfully"})
}
if(quantity > stock){
    return res.status(400).json({message: `Only ${stock} items left in stock.`, success: false})
}

cart.items.push({product: productId,
               variant: variantId,
                 quantity,
                price:product.variants.find(variant=> variant._id.toString()=== variantId).price})

await cart.save()

return res.status(200).json({message: "Product added to cart successfully", success: true})

}


export const getCart = async (req, res) => {
    const user = req.user

    let cart = await cartModel.findOne({ user: user._id }).populate("items.product")

    if (!cart) {
        cart = await cartModel.create({ user: user._id })
    }

    return res.status(200).json({
        message: "Cart fetched successfully",
        success: true,
        cart
    })
}