import axios from "axios";

let baseUrl="http://localhost:8080/api/order";

export const addOrder=(order)=>{
    return axios.post(baseUrl,order);
}
export const getOrdersByUser=(userId)=>{
    return axios.get(`${baseUrl}/byUserId/${userId}`)
}
