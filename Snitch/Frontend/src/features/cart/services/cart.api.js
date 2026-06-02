import axios from 'axios';

const cartApi= axios.create({
    baseURL:"/api/cart",
    withCredentials: true,
})

export const addToCart = async ({productId,variantId}) => {

    const response= await cartApi.post(`/add/${productId}/${variantId}`,{quantity:1})
    return response.data;
}

export const getCart= async ()=>{
    const response = await cartApi.get("/")
    return response.data;
}

export const increaseQuantity = async ({productId,variantId}) => {

    const response= await cartApi.patch(`/quantity/increment/${productId}/${variantId}`)
    return response.data;
}

export const decreaseQuantity = async ({productId,variantId}) => {

    const response= await cartApi.patch(`/quantity/decrement/${productId}/${variantId}`)
    return response.data;
}