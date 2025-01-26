import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";

const router=createBrowserRouter([
    // {
    //     path: "/",
    //     element: <DashboardLayout/>,
    //     children: [
    //       {
    //         index: true,
    //         element: <HomePage />,
    //       },
    //     ]
    // },
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