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
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Tours from "@/pages/Tour";
import TourDetails from "@/components/modules/Tours/TourDetails";
import Homepage from "@/pages/Homepage";
import Booking from "@/pages/Booking";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Homepage,
            },
            {
                path: "about",
                Component: withAuth(About),
            },
            {
                path: "tours",
                Component: withAuth(Tours),
            },
            {
                path: "booking/:id",
                Component: withAuth(Booking),
            },
            {
                path: "tours/:id",
                Component: withAuth(TourDetails),
            },
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.superAdmin as TRole),
        path: '/admin',
        children: [
            {index: true, element: <Navigate to={'/admin/analytics'}/>},
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.user as TRole),
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
    },    
    {
        Component: Unauthorized,
        path: '/unauthorized'
    }    

]);

export default router;