import { createBrowserRouter } from "react-router";
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import CreateProduct from "../features/products/pages/CreateProduct.jsx";
import Dashboard from "../features/products/pages/Dashboard.jsx";
import Protected from "../features/products/components/Protected.jsx";  
import Home from "../features/products/pages/Home.jsx";
import ProductDetail from "../features/products/pages/ProductDetail.jsx";
import SellerProductDetail from "../features/products/pages/SellerProductDetail.jsx";
import AppLayout from "./AppLayout.jsx";
import Cart from "../features/cart/pages/Cart.jsx"

export const router= createBrowserRouter([
    
    {
        path:"/register",
        element: <Register/>
    },
    {
        path:"/login",
        element: <Login/>
    },
     {
       path:"/cart",
       element: <Protected><Cart/></Protected>
    },
    {
       element:<AppLayout/>,
       children:[
        {
        path:"/",
        element: <Home/>
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
           },
           {
            path:"/seller/products/:productId",
            element: <Protected role="seller"><SellerProductDetail/></Protected>
           }
        ]
    }
       ]
    }
])