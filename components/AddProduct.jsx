import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../api/productService";
import { TextField, Button, Typography, Box } from '@mui/material';
import { useSelector } from "react-redux";


const AddProduct = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user?.currentUser)
    const onSubmit = async (data) => {
        try {
            const formattedData = {
                category: data.category,
                productName: data.name, // שם השדה בשרת הוא productName
                description: data.description,
                price: data.price,
                size: data.size,
                image: data.image
            };

            console.log("user.token:", user?.token); // בדיקת תקינות ה-token
            await addProduct(formattedData, user?.token);

            navigate("/products"); 
        } catch (err) {
            console.log("Error adding product:", err);
        }
    };



    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3 }}>
            <Typography variant="h4" gutterBottom>Add a new product</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Category"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('category', { required: 'Product category is a required field.' })}
                    error={!!errors.category}
                    helperText={errors.category?.message}
                />
                <TextField
                    label="Name product "
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('name', { required: 'Product name is a required field.' })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <TextField
                    label="Description product "
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('description', { required: 'Product description is a required field.' })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />

                <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    {...register('price', {
                        required: 'Product price is a required field.',
                        valueAsNumber: true,
                        min: { value: 0, message: 'The price cannot be negative.' }
                    })}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                />
                 <TextField
                    label="Size"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('size', { required: 'Product size is a required field.' })}
                    error={!!errors.size}
                    helperText={errors.size?.message}
                />

                <TextField
                    label="image (URL)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('image', { required: 'Product image is a required field.' })}
                    error={!!errors.image}
                    helperText={errors.image?.message}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                     add product
                </Button>
            </form>
        </Box>
    );
};



export default AddProduct;

