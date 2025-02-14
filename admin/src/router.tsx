import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layout/DashboadLayout";
import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/CategoryPage";
import AddProductPage from "./pages/AddProductPage";
import ProductManagement from "./pages/ProductManage";

const router=createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout/>,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "admin/category",
            element: <CategoriesPage />,
          },
          {
            path: "admin/add-product",
            element: <AddProductPage />,
          },
          {
            path: "admin/product-management",
            element: <ProductManagement />,
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
