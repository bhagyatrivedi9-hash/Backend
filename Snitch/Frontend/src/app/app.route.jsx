import { createBrowserRouter } from "react-router";
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import CreateProduct from "../features/products/pages/CreateProduct.jsx";
import Dashboard from "../features/products/pages/Dashboard.jsx";
import Protected from "../features/products/components/Protected.jsx";  
import Home from "../features/products/pages/Home.jsx";
import ProductDetail from "../features/products/pages/ProductDetail.jsx";

export const router= createBrowserRouter([
    {
        path:"/",
        element: <Home/>
    },
    {
        path:"/register",
        element: <Register/>
    },
    {
        path:"/login",
        element: <Login/>
    },
    
    {
        path:"/products/:productId",
        element: <ProductDetail/>
    },
    {
        path:"/seller",
        children:[
            {
                path:"/seller/create-product",
                element: <Protected role="seller"><CreateProduct/></Protected>
            },
           {
            path:"/seller/dashboard",
            element: <Protected role="seller"><Dashboard/></Protected>
           }
        ]
    }
])