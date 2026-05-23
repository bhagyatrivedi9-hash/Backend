import axios from "axios";

const ProductApiInstance = axios.create({
    baseURL:"/api/products",
    withCredentials:true,
})

export const createProduct= async(formData)=>{

    const response= await ProductApiInstance.post("/create", formData)
    
    return response.data
}

export const getSellerProducts= async()=>{

    const response= await ProductApiInstance.get("/seller")

    return response.data
}

export const getAllProducts= async()=>{

    const response= await ProductApiInstance.get("/")
    return response.data
}

export const getProductDetails= async(ProductId)=>{

    const response= await ProductApiInstance.get(`/details/${ProductId}`)
    return response.data
}