import { createSlice } from "@reduxjs/toolkit";

// בדיקה אם קיים מידע ב-localStorage והשבת הערך ההתחלתי
const loadCartFromLocalStorage = () => {
    try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            return JSON.parse(savedCart);
        }
    } catch (error) {
        console.error("Error loading cart from localStorage:", error);
    }
    return { arr: [] };
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemToAdd = action.payload;
            // אם יש מידה, נוודא שהיא חלק מהפריט
            if (!itemToAdd.selectedSize) {
                console.log("No size selected for the product");
                return;
            }
            let index = state.arr.findIndex(item => item._id == action.payload._id);
            if (index > -1)
                state.arr[index].qty++;
            else
                state.arr.push({ ...action.payload, qty: 1 });
            localStorage.setItem("cart", JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            let index = state.arr.findIndex(item => item._id === action.payload);
            if (index > -1) {
                if (state.arr[index].qty > 1) {
                    state.arr[index].qty--;
                } else {
                    state.arr.splice(index, 1);
                }
            }
            localStorage.setItem("cart", JSON.stringify(state));
        },
        decreaseQty: (state, action) => {
            let index = state.arr.findIndex(item => item._id === action.payload);
            if (index > -1) {
                if (state.arr[index].qty > 1) {
                    state.arr[index].qty--;
                } else {
                    state.arr.splice(index, 1);
                }
            }
            localStorage.setItem("cart", JSON.stringify(state));
        },
        clearCart: (state) => {
            state.arr = [];
            localStorage.setItem("cart", JSON.stringify(state));
        }
    },
});

export const { addToCart, removeFromCart, clearCart, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
