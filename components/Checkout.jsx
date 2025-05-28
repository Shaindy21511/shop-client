import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { addOrder } from "../api/orderService";

const Checkout =()=>{
    let navig=useNavigate();
    let user=useSelector(state=> state.user.currentUser);

    if(!user)
        navig("/login")
    let arr=useSelector(state=>state.cart.arr);
    let [address,setAddress]=useState();

    return(<form onSubmit={(e)=>{
        e.preventDefault();
        addOrder({
            userid:user._id,
            products:arr,
            address:address
        }).then(res=>{
            alert("Order successfully saved");
            console.log(res);
        }).catch(err=>{
            console.log(err);
            alert(`Error saving order\n${err.message}`)
        })
    }}>
        <label>address</label>
        <input type="text" onChange={(e)=>{
            setAddress(e.target.value);
        }}/>
        <input type="submit"/>
    </form>)
}
export default Checkout;