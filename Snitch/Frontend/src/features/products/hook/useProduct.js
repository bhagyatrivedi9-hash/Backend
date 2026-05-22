import {createProduct,getSellerProducts} from "../services/product.api.js"
import {useDispatch} from "react-redux"
import {setSellerProducts} from "../store/product.slice.js"

export const useProduct = ()=>{

    const dispatch = useDispatch()
    
    const handleCreateProduct= async (formData)=>{
        
       const data= await createProduct(formData)

     data.product
    }

    const handleGetSellerProducts= async()=>{

        const data= await getSellerProducts()
        dispatch(setSellerProducts(data.products))
        return data.products    
    }

    return {
        handleCreateProduct,
        handleGetSellerProducts,
    }
}