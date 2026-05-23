import { createSlice } from '@reduxjs/toolkit';

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        sellerproducts: [],
        products:[],
        productDetails:null
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerproducts = action.payload;
        },
        setAllProducts: (state, action) => {
            state.products = action.payload;
        },
        setProductDetails: (state, action) => {
            state.productDetails = action.payload;
        }
    }
});

export const { setSellerProducts, setAllProducts, setProductDetails } = ProductSlice.actions;
export default ProductSlice.reducer;