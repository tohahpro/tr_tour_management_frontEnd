import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router"
import Bookings from "@/pages/User/Bookings";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";

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
        children: [...generateRoutes(adminSidebarItems)]
    },
    {
        Component: DashboardLayout,
        path: '/user',
        children: [
            {
                Component: Bookings,
                path: 'bookings'
            }
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