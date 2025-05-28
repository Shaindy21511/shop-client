import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getTotalPagesCount } from "../api/productService";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { addToCart } from "../features/cartSlice";
import '../productList.css';
import EditProduct from './EditProduct';
import DeleteProduct from '../components/DeleteProduct';
import MiniCart from "../components/MiniCart";
import { Outlet, useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';


const ProductList = () => {
    let [arr, setArr] = useState([]);
    let [pagesCnt, setPagesCnt] = useState(4);
    let [currentPage, setCurrentPage] = useState(1);
    let [forEdit, setForEdit] = useState(null);
    let [cartOpen, setCartOpen] = useState(false);
    let user = useSelector((state) => state.user?.currentUser);
    let products = useSelector((state) => state.product.arr);
    let dispatch = useDispatch();
    let navigate = useNavigate(); // ניווט לעמוד המוצר

    useEffect(() => {
        bringFromServer(currentPage);
    }, [currentPage]);
    useEffect(() => {
        // עדכון המערך של המוצרים כאשר המידע משתנה ב־Redux
        setArr(products);
    }, [products]);  // תנאי - מתעדכן כאשר המוצרים ב־Redux משתנים


    useEffect(() => {
        getTotalPagesCount().then((data) => {
            setPagesCnt(data.data.totalPages);
        });
    }, []);

    const bringFromServer = (page) => {
        getAllProducts(page)
            .then(res => {
                setArr([...res.data]);
            })
            .catch(err => {
                console.log(err);
                alert("תקלה בשליפת מוצרים");
            });
    };

    // טיפול במחיקת מוצר
    const handleDeleteSuccess = (productId) => {
        setArr(prevArr => prevArr.filter(item => item._id !== productId));
    };

    function CustomIcons() {
        return (
            <Stack spacing={2}>
                <Pagination
                    count={pagesCnt}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                            {...item}
                        />
                    )}
                />
            </Stack>
        );
    }

    const toggleMiniCart = () => {
        setCartOpen(!cartOpen);
    };

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            <div className="product-grid">
                {arr.map(item => (
                    <div
                        key={item._id}
                        className="product-card"
                        onClick={() => navigate(`details/${item._id}`)} // ניווט ישיר לעמוד פרטי המוצר
                    >
                        <img src={item.image} alt={item.productName} className="product-image" />
                        <h3>{item.productName || "No name available"}</h3>
                        <div className="product-actions">
                            {user?.role !== "ADMIN" && (
                                <button
                                    className="add-to-cart-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(addToCart(item));
                                        toggleMiniCart();
                                    }}
                                >
                                    Add to cart
                                </button>
                            )}
                            {user?.role === "ADMIN" && (
                                <div className="admin-actions">
                                    <button
                                        className="edit-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setForEdit(item);
                                        }}
                                    >
                                        <CreateIcon />

                                    </button>
                                    <DeleteProduct
                                        product={item}
                                        onDeleteSuccess={handleDeleteSuccess}
                                    />
                                </div>
                            //     <button
                            //     className="delete-button"
                            //     onClick={(e) => {
                            //         e.stopPropagation();
                            //         handleDeleteSuccess(item._id);  // מחיקת המוצר
                            //     }}
                            // >
                            //     <DeleteIcon />
                            // </button>

                            )}
                        </div>
                    </div>
                ))}
            </div>
            <CustomIcons />
            <Outlet />
            {user?.role === "ADMIN" && forEdit && <EditProduct p={forEdit} onClose={() => setForEdit(null)} />}
            <MiniCart open={cartOpen} toggleDrawer={toggleMiniCart} />
        </div>
    );
};
export default ProductList;
