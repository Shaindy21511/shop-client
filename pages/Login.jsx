import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/userService';
import { userIn } from '../features/userSlice';
import {
    TextField,
    Button,
    Container,
    Box,
    Typography,
    IconButton,
    InputAdornment
} from '@mui/material';
import { createTheme} from '@mui/material/styles';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tileTheme = createTheme({
        palette: {
            primary: { main: '#6cbfbd' }, // טורקיז
            secondary: { main: '#f78b8b' }, // קורל
            background: { default: '#f8f7e9' }, // שמנת
            tertiary: { main: '#e6c4a1' }, // בז'
        },
    });

    const [showPassword, setShowPassword] = useState(true);

    const Save = async (data) => {
        try {
            let res = await loginUser(data);
            alert("User successfully login");
            dispatch(userIn(res.data));
            navigate("/products", { replace: true });
        } catch (err) {
            console.log(err);
            alert("Login error");
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    return (
        <Container maxWidth="sm">
            <Box sx={{
                mt: 5, p: 3,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: "white"
            }}>

                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form noValidate onSubmit={handleSubmit(Save)}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin='normal'
                        fullWidth
                        {...register("username", {
                            required: { value: true, message: "Username is required" }
                        })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                    <TextField
                        label="Password"
                        type={showPassword ? "password" : "text"}
                        variant="outlined"
                        margin='normal'
                        fullWidth
                        {...register("password", {
                            required: { value: true, message: "Password is required" },
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

                    <Button type="submit"  fullWidth variant='contained'
                        sx={{ "&:hover": { color: tileTheme.palette.secondary.main } }}
                    >
                        Login
                    </Button>
                </form>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
