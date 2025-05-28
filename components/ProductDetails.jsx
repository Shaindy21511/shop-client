import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api/productService";
import './productDetails.scss';
import { addToCart } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import MiniCart from "../components/MiniCart";  



const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cartOpen, setCartOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null); // לשמור את המידה שנבחרה
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.currentUser); // הוספה חיונית

    useEffect(() => {
        getProductById(id)
            .then(res => {
                console.log(res.data);
                setProduct(res.data);
            })
            .catch(err => {
                alert("תקלה בשליפת המוצר: " + (err.response?.data?.message || err.message));
            })
    }, [id]);
    const toggleMiniCart = () => {
        setCartOpen(!cartOpen);
    };
    return (
        <div className="Details">
            <div className="inner">
                <button className="close-btn" onClick={() => navigate(-1)}>x</button>
                {product ? (
                    <>
                        <div className="image-container">
                            <img src={product.image} alt={product.productName} className="product-image" />
                        </div>
                        <div className="product-details">
                            <h2>{product.productName}</h2>
                            <p><strong>Price:</strong> ${product.price}</p>
                            <p><strong>Description:</strong> {product.description || "No description available"}</p>

                            {/* הצגת המידות */}
                            {product.size && product.size.length > 0 && (
                                <div className="size">
                                    <p><strong>Choose Size:</strong></p>
                                    <div className="size-buttons">
                                        {product.size.map((size) => (
                                            <button
                                                key={size}
                                                className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                                onClick={() => {
                                                    setSelectedSize(size);
                                                }
                                                }
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* כפתור הוספה לסל */}
                            {user?.role !== "ADMIN" && (
                                <button
                                    className="add-to-cart-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!selectedSize) {
                                            alert("Please choose a size first!");
                                            return;
                                        }

                                        const itemToAdd = {
                                            ...product,
                                            selectedSize,
                                            quantity: 1,
                                        };

                                        dispatch(addToCart(itemToAdd));
                                        console.log("The item is added:", itemToAdd);
                                        toggleMiniCart();
                                    }}
                                >
                                    Add to Cart
                                </button>
                            )}


                        </div>
                    </>
                ) : (
                    <p>Loading product details...</p>
                )}
            </div>
            <MiniCart open={cartOpen} toggleDrawer={toggleMiniCart} />

        </div >
    );
};

export default ProductDetails;
