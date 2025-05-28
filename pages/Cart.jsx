import { useSelector, useDispatch } from "react-redux";
import { clearCart, addToCart, decreaseQty } from "../features/cartSlice";
import { Button, Box, Typography, Card, CardContent, Grid, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.arr) || [];
    const dispatch = useDispatch();
    const navig = useNavigate();

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            navig("/products");
        } else {
            navig("/check");
        }
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <Box sx={{ padding: 3 }}>
            <Box
                sx={{
                    position: "fixed",
                    top: 120,
                    left: 20,
                    display: "flex",
                    gap: 2,
                    zIndex: 1000
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DeleteIcon />}
                    onClick={() => dispatch(clearCart())}
                    sx={{ width: 200, height: 30 }}
                >
                    Clear Cart
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCheckout}
                    sx={{ width: 200, height: 30 }}
                >
                    Complete Order
                </Button>
            </Box>

            <Typography variant="h4" gutterBottom sx={{ marginTop: 12 }}>
                Your Shopping Cart
            </Typography>

            {cartItems.length === 0 ? (
                <Typography variant="h6">The cart is empty</Typography>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {cartItems.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item._id}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img
                                                src={item.image}
                                                alt={item.productName}
                                                style={{ width: '100%', maxWidth: 200, height: 'auto' }}
                                            />
                                            <Typography variant="h6" align="center">{item.productName}</Typography>
                                            <Typography variant="body1" align="center">Price: ${item.price}</Typography>
                                            <Typography variant="body2" align="center">Quantity: {item.qty}</Typography>
                                            <Typography variant="body2" align="center">Size: {item.selectedSize || 'No size selected'}</Typography>
                                            <Typography variant="body1" align="center">Total: ${item.price * item.qty}</Typography>

                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, marginTop: 2 }}>
                                                <IconButton color="primary" onClick={() => dispatch(addToCart(item))}>
                                                    <AddIcon />
                                                </IconButton>
                                                <IconButton color="secondary" onClick={() => dispatch(decreaseQty(item._id))}>
                                                    <RemoveIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* סה"כ לתשלום */}
                    <Box sx={{
                        marginTop: 4,
                        textAlign: "center",
                        backgroundColor: "#f5f5f5",
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 3,
                        maxWidth: 400,
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>
                        <Typography variant="h5" color="primary">
                           Total price: ${totalPrice.toFixed(2)}
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Cart;
