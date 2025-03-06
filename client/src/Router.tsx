import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CollectionPage from "@/pages/CollectionPage";
import { HomePage } from "./pages/HomePage";
import { ProductDetails } from "./pages/ProductDetails";
import { CartPage } from "./pages/CartPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PageNotFound } from "./pages/PageNotFound";
import PlaceOrder from "./pages/PlaceOrder";

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
          }
           
        ],
      },
])

export default router;
