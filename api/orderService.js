import axios from "axios";

let baseUrl="https://shop-ax1q.onrender.com/api/order";

export const addOrder=(order)=>{
    return axios.post(baseUrl,order);
}
export const getOrdersByUser=(userId)=>{
    return axios.get(`${baseUrl}/byUserId/${userId}`)
}
