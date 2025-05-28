import { Route, Routes } from "react-router-dom";
import ProductList from "../pages/ProductList";
import Signup from "../pages/Signup";

const Router = () => {

    return (
        <Routes>
            <Route path="products" element={<ProductList />} />
            <Route path="sign in" element={<Signup />} />
            <Route path="*" element={<Signup />} />


        </Routes>

    )

}
export default Router;