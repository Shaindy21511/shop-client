import { useSelector, useDispatch } from "react-redux";
import { clearCart, addToCart, decreaseQty } from "../features/cartSlice";
import { Box, Typography, IconButton, Badge, Drawer, List, ListItem, ListItemText, Divider, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';




const MiniCart = ({ open, toggleDrawer }) => {
    const cartItems = useSelector(state => state.cart.arr) || [];
    const dispatch = useDispatch();
    const navig = useNavigate();

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                toggleDrawer();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [open, toggleDrawer]);

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer}
                sx={{ width: 300 }}
            >
                <Box sx={{ width: 250, padding: 2 }}>
                    <Typography variant="h6" gutterBottom>Your Cart</Typography>
                    <Divider />
                    <List>
                        {cartItems.length === 0 ? (
                            <Typography variant="body1">Your cart is empty.</Typography>
                        ) : (
                            cartItems.map((item) => (
                                <ListItem key={item._id}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <img
                                            src={item.image}
                                            alt={item.productName}
                                            style={{ width: 40, height: 40, objectFit: 'cover' }}
                                        />
                                        <ListItemText
                                            primary={item.productName}
                                            secondary={`$${item.price} x ${item.qty}`}
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <IconButton color="primary" onClick={() => dispatch(addToCart(item))}>
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton color="secondary" onClick={() => dispatch(decreaseQty(item._id))}>
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </ListItem>
                            ))
                        )}
                    </List>

                    <Divider />
                    <Box sx={{ paddingTop: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            fullWidth
                            onClick={() => dispatch(clearCart())}
                        >
                        </Button>
                        <Button
                            variant="contained"
                            color=""
                            startIcon={<ShoppingCartIcon />
                            }
                            fullWidth
                            onClick={() => navig("/cart")}>
                            

                        </Button>


                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default MiniCart;
