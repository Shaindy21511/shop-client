import { useForm } from "react-hook-form";
import { updateProduct } from "../api/productService";
import { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Modal, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateProductInList } from '../features/productSlice'

const EditProduct = ({ p, onClose }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onBlur",
    });
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.currentUser);
    const [sizeInput, setSizeInput] = useState("");  // שדה המידות כאילו טקסט

    useEffect(() => {
        if (p) {
            reset(p); // קובע את הערכים בשדות הפורם
            setSizeInput(p.size ? p.size.join(", ") : ""); // אם יש מידות, מציג אותן בטקסט
        }
    }, [p, reset]);

    const handleSizeChange = (e) => {
        setSizeInput(e.target.value);  // עדכון ערך שדה המידות
    };

    const onSubmit = async (data) => {
        try {
            // מחלק את המידות למערך
            const updatedData = { ...data, size: sizeInput.split(",").map(size => size.trim()) };
            await updateProduct(updatedData, user.token);
            dispatch(updateProductInList(updatedData)); // עדכון המוצר ברשימה ב־Redux
            alert("Product updated successfully!");
            onClose();
        } catch (err) {
            console.error("Error updating product:", err);
            alert("Failed to update product");
        }
    };

    return (
        <Modal
            open={true}
            onClose={onClose}
            aria-labelledby="edit-product-modal"
            aria-describedby="modal-to-edit-product"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    borderRadius: 2,
                    padding: 3,
                    boxShadow: 24,
                    minWidth: 400,
                }}
            >
                <Typography variant="h6" gutterBottom>Edit Product</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Product Name"
                                variant="outlined"
                                fullWidth
                                {...register("productName", { required: "Product name is required" })}
                                error={!!errors.productName}
                                helperText={errors.productName?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Price"
                                variant="outlined"
                                fullWidth
                                type="number"
                                {...register("price", { required: "Price is required", min: 0 })}
                                error={!!errors.price}
                                helperText={errors.price?.message}
                            />
                        </Grid>

                        {/* שדה המידות */}
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>Sizes (Separate with commas)</Typography>
                            <TextField
                                label="Size"
                                variant="outlined"
                                fullWidth
                                value={sizeInput}
                                onChange={handleSizeChange}
                                helperText="Enter sizes separated by commas (e.g., S, M, L)"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Image URL"
                                variant="outlined"
                                fullWidth
                                {...register("image", { required: "Image URL is required" })}
                                error={!!errors.image}
                                helperText={errors.image?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                {...register("description")}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 2 }}>
                        <Button variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">Save Changes</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default EditProduct;
