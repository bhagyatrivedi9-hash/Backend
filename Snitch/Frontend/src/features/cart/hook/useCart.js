import {addItem,setItems,incrementCartItem,decrementCartItem} from "../store/cart.slice.js"
import {useDispatch} from "react-redux"
import {addToCart,getCart,decreaseQuantity,increaseQuantity} from "../services/cart.api.js"

export const useCart = () => {
    const dispatch = useDispatch()
    const handleAddItemToCart = async ({productId,variantId}) => {
    
        const data = await addToCart({productId,variantId})

        return data
    }
    const handleGetCartItems = async () => {
        try {
            const data = await getCart();
             
            const itemsToSet = data?.cart?.items  || [];
            dispatch(setItems(itemsToSet));
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }
    const handleIncreaseCartItem = async ({productId,variantId}) => {
        const data= await increaseQuantity({productId,variantId})
        dispatch(incrementCartItem({productId,variantId}))
    }
    const handleDecreaseCartItem = async ({productId,variantId}) => {
        const data= await decreaseQuantity({productId,variantId})
        dispatch(decrementCartItem({productId,variantId}))
    }
    return {
        handleAddItemToCart,
        handleGetCartItems,
        handleIncreaseCartItem,
        handleDecreaseCartItem
    }
}