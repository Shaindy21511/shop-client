import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { clearCart } from "../features/cartSlice";
import { addOrder } from "../api/orderService"; // API לשמירת ההזמנה

const EndigOrder = () => {
    const [address, setAddress] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [orderDate] = useState(new Date().toISOString().split('T')[0]); // תאריך נוכחי
    const [error, setError] = useState("");
    const cartItems = useSelector((state) => state.cart.arr);
    const user = useSelector((state) => state.user?.currentUser); // מידע על המשתמש (מתוך Redux)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("User state in useEffect:", user);
    
        if (!user || !user._id) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        // הגדרת תאריך יעד לשבוע מהיום
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 7);
        setDeliveryDate(targetDate.toISOString().split('T')[0]);
    }, []);

    const handleOrderSubmit = async () => {
        console.log(user._id);
        if (!user || !user._id) {
            console.error("User is undefined or missing id:", user);
            setError("User information is missing. Please log in again.");
            return;
        }
        if (!address) {
            setError("Please enter your delivery address");
            return;
        }

        if (!user?._id) {
            setError("User ID is missing");
            return;
        }

        const orderData = {
            userId: user._id,
            address: address,
            arrProduct: cartItems,
        };

        try {
            await addOrder(orderData); // שליחה לשרת
            dispatch(clearCart()); // ריקון העגלה ב-Redux
            alert("Your order has been placed successfully!");
            navigate("/orders");
            // // ניתוב לדף אישור הזמנה
        } catch (err) {
            console.error("Error placing order:", err);
            alert("Failed to place your order. Please try again.");
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Checkout</Typography>

            {cartItems.length === 0 ? (
                <Typography variant="h6">Your cart is empty</Typography>
            ) : (
                <>
                    <Typography variant="h6" gutterBottom>Your Order</Typography>
                    {/* הצגת המוצרים בעגלה */}
                    <Box sx={{ marginBottom: 3 }}>
                        {cartItems.map((item) => (
                            <Typography key={item._id}>{item.productName} x {item.qty} - ${item.price * item.qty}</Typography>
                        ))}
                    </Box>

                    {/* טופס פרטי הכתובת */}
                    <TextField
                        label="Delivery Address"
                        variant="outlined"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        error={!!error}
                        helperText={error}
                        sx={{ marginBottom: 3 }}
                    />

                    {/* כפתור שליחת הזמנה */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOrderSubmit}
                        fullWidth
                    >
                        Place Order
                    </Button>
                </>
            )}
        </Box>
    );
};

export default EndigOrder;
