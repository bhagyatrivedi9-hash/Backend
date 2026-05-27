import { uploadImage } from "../services/storage.service.js";
import productModel from "../models/product.model.js"

export const createProduct = async (req, res) => {

  const { title, description, priceAmount, priceCurrency } = req.body
  const images = req.files
  const seller = req.user
  console.log(req.files)

  const imageUrl = await Promise.all(
    images.map(async (image) => {
      const url = await uploadImage({
        buffer: image.buffer,
        fileName: image.originalname
      })
      return url
    })
  )

  const product = await productModel.create({
    title,
    description,
    price: { amount: priceAmount, currency: priceCurrency },
    images: imageUrl,
    seller: seller._id
  })




  res.status(201).json({
    message: "Product created successfully",
    success: true,
    product
  })
}

export const getSellerProdcuts = async (req, res) => {
  const seller = req.user

  const products = await productModel.find({
    seller: seller._id
  })

  res.status(200).json({
    message: "Prodcuts fetched successfully",
    success: true,
    seller,
    products
  })
}

export const getAllProducts = async (req, res) => {

  const products = await productModel.find()

  res.status(200).json({
    message: "Prodcuts fetched successfully",
    success: true,
    products
  })
}

export const getProductDetails = async (req, res) => {

  const { Id } = req.params


  const products = await productModel.findById(Id)

  if (!products) {
    return res.status(404).json({
      message: "Product not found",
      success: false
    })
  }

  res.status(200).json({
    message: "Product fetched successfully",
    success: true,
    products
  })
}


export const createProductVariant = async (req, res) => {
  const { productId } = req.params

  const product = await productModel.findOne({
    _id: productId,
    seller: req.user._id
  })
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      success: false
    })
  }
  const images = []
  const file = req.files
  const price = req.body.priceAmount
  const stock = req.body.stock
  const attributes = JSON.parse(req.body.attributes || "{}")


  if (file || file.length > 0) {

    (await Promise.all(file.map(async (file) => {
      const image = await uploadImage({
        buffer: file.buffer,
        fileName: file.originalname
      })
      return image

    }))).map(image => images.push(image))
  }
  const variant = product.variants.push({
    images,
    price: {
      amount: Number(price) || product.price.amount,
      currency: req.body.priceCurrency || product.price.currency

    },
    stock,
    attributes,

  })
  await product.save()

 return res.status(201).json({
    message: "Product variant created successfully",
    success: true,
   product
  })

}