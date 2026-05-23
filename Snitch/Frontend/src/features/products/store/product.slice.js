import { createSlice } from '@reduxjs/toolkit';

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        sellerproducts: [],
        products:[]
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerproducts = action.payload;
        },
        setAllProducts: (state, action) => {
            state.products = action.payload;
        }
    }
});

export const { setSellerProducts, setAllProducts } = ProductSlice.actions;
export default ProductSlice.reducer;