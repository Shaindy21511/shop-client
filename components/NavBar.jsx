import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // אייקון יציאה
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // אייקון הרשמה
import Logo from '../assets/Logo.webp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, Box } from "@mui/material";
import { userOut } from "../features/userSlice"; // פעולה ליציאה מהמשתמש
import { clearCart } from "../features/cartSlice";

// צבעים מהלוגו
const tileTheme = createTheme({
  palette: {
    primary: { main: '#6cbfbd' }, // טורקיז
    secondary: { main: '#f78b8b' }, // קורל
    background: { default: '#f8f7e9' }, // שמנת
    tertiary: { main: '#e6c4a1' }, // בז'
  },
});

const NavBar = ({ showLabels = true }) => {
  const user = useSelector((state) => state.user?.currentUser);
  const isAdmin = user?.role === "ADMIN"; // בדיקה האם המשתמש הוא מנהל
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("products");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    dispatch(userOut()); // התנתקות מהמשתמש
    dispatch(clearCart());
  };

  // בדיקה אם המשתמש מחובר וה-role שלו הוא USER
  const showLogoutButton = user && user.role === "USER";

  return (
    <ThemeProvider theme={tileTheme}>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 1000,
          backgroundColor: tileTheme.palette.background.default, // רקע שמנת בהיר
          boxShadow: `0px 4px 6px ${tileTheme.palette.primary.main}33`, // צל עם שקיפות טורקיז
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // ניווט בצד שמאל, לוגו בצד ימין
          padding: "10px 20px",
          borderBottom: `2px solid ${tileTheme.palette.primary.main}`,
        }}
      >
        {/* ניווט (צד שמאל) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels={showLabels}
            sx={{
              width: "100%",
              maxWidth: "400px",
              backgroundColor: "transparent",
              "& .Mui-selected": { color: `${tileTheme.palette.primary.main} !important` },
              "& .MuiBottomNavigationAction-root": { color: tileTheme.palette.tertiary.main },
              "& .MuiBottomNavigationAction-label": { fontSize: '0.9rem', fontWeight: 'bold' },
              "& svg": { fontSize: '1.5rem' }
            }}
          >
            <BottomNavigationAction
              label={user ? "profile" : "login"}
              value="login"
              icon={<AccountCircleIcon />}
              component={Link}
              to={user ? "/profile" : "/login"}
              sx={{ "&:hover": { color: tileTheme.palette.secondary.main } }}
            />

            {user?.role === "ADMIN" && (
              <BottomNavigationAction
                label="add product"
                value="add product"
                component={Link}
                to="/add-product"
                sx={{ "&:hover": { color: tileTheme.palette.secondary.main } }}
              />
            )}

            {user?.role != "ADMIN" && (
              <BottomNavigationAction
                label="cart"
                value="cart"
                icon={<LocalMallIcon />}
                component={Link}
                to="/cart"
                sx={{ "&:hover": { color: tileTheme.palette.secondary.main } }}
              />
            )
            }
            <BottomNavigationAction
              label="products"
              value="products"
              component={Link}
              to="/products"
              sx={{ "&:hover": { color: tileTheme.palette.secondary.main } }}
            />



            {/* כפתור הרשמה/יציאה - יוצג רק אם המשתמש מחובר וה-role שלו USER */}
            {showLogoutButton && (
              <BottomNavigationAction
                label="Logout"
                value="logout"
                icon={<ExitToAppIcon />}
                component={Link}
                to="/"
                onClick={handleLogout}
                sx={{ "&:hover": { color: tileTheme.palette.secondary.main } }}
              />
            )}
          </BottomNavigation>
        </Box>

        {/* לוגו + טקסט "שלום, משתמש" (צד ימין) */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            color={tileTheme.palette.primary.main}
            sx={{ marginRight: "15px", fontWeight: "bold" }}
          >
            hello {user ? user.username : "guest"}
          </Typography>

          {/* לוגו (צד ימין) */}
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              style={{
                height: "80px",
                filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2))" // צל קל ללוגו
              }}
            />
          </Link>
        </Box>
      </nav>
    </ThemeProvider>
  );
};

export default NavBar;