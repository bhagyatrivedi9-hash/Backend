import { createSlice } from '@reduxjs/toolkit';

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.products = action.payload;
        },
    }
});

export const { setSellerProducts } = ProductSlice.actions;
export default ProductSlice.reducer;