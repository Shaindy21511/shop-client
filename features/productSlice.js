import { createSlice } from "@reduxjs/toolkit"

const initalState = {
    arr: []
}
const productSlice = createSlice({
    name: "product",
    initialState: initalState,
    reducers: {
        addProduct: (state, action) => {
            let index = state.arr.findIndex(item => item._id == action.payload._id)
            if (index == -1)
                state.arr.push({ ...action.payload })

        },
        initProducts: (state, action) => {
            state.arr = action.payload;
        },
        updateProductInList: (state, action) => {
            const updatedProduct = action.payload;
            const index = state.arr.findIndex(item => item._id === updatedProduct._id);
            if (index !== -1) {
                state.arr[index] = updatedProduct;
            }
        },
        
    },

})
export const { addProduct, initProducts,updateProductInList } = productSlice.actions;
export default productSlice.reducer;
