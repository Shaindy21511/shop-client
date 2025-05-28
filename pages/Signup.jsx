import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addUser } from "../api/userService";
import { useForm } from "react-hook-form";
import { userIn } from "../features/userSlice";
import { 
    TextField, 
    Button, 
    Container, 
    Typography, 
    Box,
    IconButton,
    InputAdornment
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Signup = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);
    
    const Save = async (data) => {
        try {
            let userData = { ...data, role: "USER" };
            let res = await addUser(userData);
            alert("User successfully registered");
            dispatch(userIn(res.data));
            console.log(res.data);
            navigate("/products", { replace: true });
        } catch (err) {
            console.log(err);
            alert("Registration error");
        }
    };
    
    let { register, handleSubmit, formState: { errors } } = useForm();
    
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
                </Typography>
                <form noValidate onSubmit={handleSubmit(Save)}>
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        {...register("username", { required: "Username is required" })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                   
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /[a-zA-Z0-9]{5,}@gmail.com/,
                                message: "Email needs to be in correct format"
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                   
                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? "password" : "text"}
                        margin="normal"
                        {...register("password", {
                            required: "Password is required",
                            pattern: {
                                value: /[a-zA-Z0-9]{5,}/,
                                message: "Password needs at least 5 digits/letters"
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                   
                    <TextField
                        fullWidth
                        label="Phone"
                        margin="normal"
                        {...register("phone", { required: "Phone is required" })}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />
                   
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Sign Up
                    </Button>
                </form>
                
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Already have an account? <Link to="/login">Login here</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Signup;