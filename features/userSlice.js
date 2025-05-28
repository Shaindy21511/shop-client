import { createSlice } from "@reduxjs/toolkit"

const loadUserFromLocalStorage = () => {
    try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            return JSON.parse(savedUser);
        }
    } catch (error) {
        console.error("Error loading user from localStorage:", error);
    }
    return { arr: [] };
};

const initialState = loadUserFromLocalStorage;
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userIn: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("user",JSON.stringify(state));
        },
        userOut: (state) => {
            state.currentUser = null;
            localStorage.setItem("user",JSON.stringify(state));

        }
    }
})
export const { userIn, userOut } = userSlice.actions;
export default userSlice.reducer;
