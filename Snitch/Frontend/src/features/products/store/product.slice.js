import { createSlice } from '@reduxjs/toolkit';

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        sellerproducts: [],
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerproducts = action.payload;
        },
    }
});

export const { setSellerProducts } = ProductSlice.actions;
export default ProductSlice.reducer;