import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import userSlice from "../features/userSlice";
import productSlice from "../features/productSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: userSlice,
        product: productSlice
    }
})