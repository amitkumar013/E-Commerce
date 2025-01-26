import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/registerPage";
import DashboardPage from "./layout/DashboadLayout";

const router=createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage/>,
        children: [
          // {
          //   index: true,
          //   element: <HomePage />,
          // },
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
