import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layout/DashboadLayout";
import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/CategoryPage";
import AddProductPage from "./pages/AddProductPage";
import ProductManagement from "./pages/ProductManage";
import ProtectedRoute from "./context/protectedRoute";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import { PageNotFound } from "./pages/PageNotFound";
import SettingPage from "./pages/SettingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
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
      },
      {
        path: "admin/order",
        element: <OrderPage />,
      },
      {
        path: "admin/profile",
        element: <ProfilePage />
      },
      {
        path: "settings",
        element: <SettingPage />
      },
      {
        path: "*",
        element: <PageNotFound />
      }
    ],
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
]);

export default router;
