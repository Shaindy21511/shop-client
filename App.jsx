import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './pages/ProductList'
import Signup from './pages/Signup'
import NavBar from './components/NavBar'
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Cart from './pages/Cart'
import EndigOrder from './components/EndigOrder'
import AddProduct from './components/AddProduct'
import ProductDetails from './components/ProductDetails.jsx'
import Orders from './components/Orders'
// import Start from './components/Start.jsx'

function App() {
  return (
    <>
    
      <div style={{ paddingTop: "60px" }}> {/* מונע שהתוכן יתחבא מאחורי ה-Navbar */}
        <NavBar />
        {/* <Start/> */}


        <Routes>
          <Route path="/products" element={<ProductList />} >
            <Route path="details/:id" element={<ProductDetails />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/check" element={<EndigOrder />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path='/orders' element={<Orders />}/>
          <Route path="*" element={<Login />} />
        </Routes>
      </div> 
    </>
  )
}
export default App
