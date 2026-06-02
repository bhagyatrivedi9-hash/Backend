import {configureStore} from '@reduxjs/toolkit'
import authReducer from "../features/auth/store/auth.slice.js"
import productReducer from "../features/products/store/product.slice.js"
import cartReducer from "../features/cart/store/cart.slice.js"
const store= configureStore({
     reducer:{
        auth:authReducer,
        product:productReducer,
         cart:cartReducer
    
     }
})
export default store