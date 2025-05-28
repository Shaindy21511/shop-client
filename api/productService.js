import axios from 'axios';


let baseUrl="https://shop-ax1q.onrender.com/api/product";

export const getAllProducts=(page)=>{
    return axios.get(baseUrl+"?limit=10&page="+page);
}
export const getProductById=(productId)=>{
    return axios.get(`${baseUrl}/byId/${productId}`)
};
export const getTotalPagesCount=()=>{
    return axios.get(baseUrl+"/total?limit=10");
};
export const addProduct = (product, token) => {
    return axios.post(`${baseUrl}/`, product, { 
        headers: { Authorization: `Bearer ${token}` } 
    });
};

export const updateProduct = (product,token) => {
    return axios.put(`${baseUrl}/${product._id}`, product,{
        headers: { Authorization: `Bearer ${token}` }
    });
};
export const deleteProduct = (productId, token) => {
    return axios.delete(`${baseUrl}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};


// import { authenticatedAxios } from "./userService";

// // פונקציות קיימות עם axios מאומת
// export const getAllProducts = (page = 1) => {
//   return authenticatedAxios.get(`/products?page=${page}`);
// };

// export const getTotalPagesCount = () => {
//   return authenticatedAxios.get(`/products/pages`);
// };

// // פונקציית מחיקת מוצר מעודכנת
// export const deleteProduct = (productId) => {
//   // בדיקה שה-ID תקין
//   if (!productId) {
//     console.error("Product ID is missing or undefined");
//     return Promise.reject(new Error("Product ID is required"));
//   }
  
//   return authenticatedAxios.delete(`/product/${productId}`);
// };