import {configureStore} from '@reduxjs/toolkit'
import authReducer from "../features/auth/store/auth.slice.js"
import productReducer from "../features/products/store/product.slice.js"
const store= configureStore({
     reducer:{
        auth:authReducer,
        product:productReducer,
     }
})
export default store