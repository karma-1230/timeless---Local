import { createBrowserRouter, Router } from "react-router-dom";
import LandingPage from "./User/Pages/Landingpage"
import ProductsDisplay from "./User/Pages/ProductsDisplay";
import Dashboard from "./Admin/Pages/Dashboard";
import ManageItems from "./Admin/Pages/ManageItems";
import AddItem from "./Admin/Pages/AddItem";
import UpdateItem from "./Admin/Pages/UpdateItem";
import ViewItems from "./Admin/Pages/ViewItem";
import Signup from "./User/Pages/Signup";
import Login from "./User/Pages/Login";
import AboutUs from "./User/Pages/AboutUs";
import ContactUs from "./User/Pages/ContactUs";
import Profile from "./User/Pages/Profile";
import Checkout from "./User/Pages/Checkout";
import CheckoutSuccess from "./User/Pages/CheckoutSuccess";
import ProductDescription from "./User/Pages/ProductDescription";
import Orders from "./User/Pages/Orders";



const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/AboutUs", element: <AboutUs /> },
    { path: "/ContactUs", element: <ContactUs /> },
    { path: "/Products/:category", element: <ProductsDisplay /> },
    { path: "/admin/dashboard", element: <Dashboard /> },
    { path: "/admin/manage-items", element: <ManageItems /> },
    { path: "/add-item", element: <AddItem /> },
    { path: "/update-item/:id", element: <UpdateItem /> },
    { path: "/view-items", element: <ViewItems /> },
    { path: "/profile", element: <Profile /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "/checkout/success", element: <CheckoutSuccess /> },
    { path: "/product", element: <ProductDescription /> },
    { path: "/orders", element: <Orders /> }
])

export default router