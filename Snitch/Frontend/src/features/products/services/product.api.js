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

    const response= await ProductApiInstance.get()

    return response.data
}