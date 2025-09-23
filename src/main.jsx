import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutRoot from "./components/LayoutRoot.jsx";
import Homepage from "./components/Homepage.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import RegisterForm from "./components/LoginForm/RegisterForm.jsx";
import ResetPassword from "./components/LoginForm/ResetPassword.jsx";
import ResetPasswordForm from "./components/LoginForm/ResetPassword.jsx";
import RsPassByEmail from "./components/LoginForm/RsPassByEmail.jsx";
import UserInfo from "./components/UserForm/UserInfo.jsx";
import AddressList from "./components/UserForm/AddressList.jsx";
import UserPage from "./components/UserForm/UserPage.jsx";
import UserPassChange from "./components/UserForm/UserPassChange.jsx";
import UserSupport from "./components/UserForm/UserSupport.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/resetpass",
        element: <ResetPassword />,
      },
      {
        path: "/rspassbyemail",
        element: <RsPassByEmail />,
      },
      // {
      //   path: "/request-reset",
      //   element: <RequestResetPassword />,
      // },
      // {
      //   path: "/resetpass",
      //   element: <ResetPasswordForm />,
      // },
      {
        path: "/userPage",
        element: <UserPage />,
        children: [
          {
            index: true,
            element: <UserInfo />,
          },
          {
            path: "userInfo",
            element: <UserInfo />,
          },
          {
            path: "address",
            element: <AddressList />,
          },
          {
            path: "passChange",
            element: <UserPassChange />,
          },
          {
            path: "userSupport",
            element: <UserSupport />,
          },
        ],
      },
      {
        path: "*",
        element: <h1 className="text-center mt-10">404 - Page Not Found</h1>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
