import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter, Navigate } from "react-router"
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "about",
                Component: About,
            }
        ]
    },
    {
        Component: DashboardLayout,
        path: '/admin',
        children: [
            {index: true, element: <Navigate to={'/admin/analytics'}/>},
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        Component: DashboardLayout,
        path: '/user',
        children: [
            {index: true, element: <Navigate to={'/user/bookings'}/>},
            ...generateRoutes(userSidebarItems)
        ]
    },
    {
        Component: Login,
        path: '/login'
    },
    {
        Component: Register,
        path: '/register'
    },
    {
        Component: Verify,
        path: '/verify'
    }    

]);

export default router;