import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CollectionPage from "@/pages/CollectionPage";
import { HomePage } from "./pages/HomePage";
import { ProductDetails } from "./pages/ProductDetails";
import { CartPage } from "./pages/CartPage";
import { PageNotFound } from "./pages/PageNotFound";
import PlaceOrder from "./pages/PlaceOrder";
import ProfilePage from "./pages/ProfilePage";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrder from "./pages/MyOrdersPage";
import WishlistPage from "./pages/WishListPage";
import SettingPage from "./pages/SettingPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout/>,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "collection",
            element: <CollectionPage />,
          },
          {
            path: "product-details/:id",
            element: <ProductDetails />,
          },
          {
            path: "cart",
            element: <CartPage />
          },
          {
            path: "profile",
            element: <ProfilePage />
          },
          {
            path: "place-order",
            element: <PlaceOrder />
          },
          {
            path: "order-success",
            element: <OrderSuccess />
          },
          {
            path: "my-order",
            element: <MyOrder />
          },
          {
            path: "wishlist",
            element: <WishlistPage />
          },
          {
            path: "settings",
            element: <SettingPage />
          },
          {
            path: "*",
            element: <PageNotFound />
          }
        ]
    },

    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
           
        ],
      },
])

export default router;
