import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Admin/Analytics";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router"
import Bookings from "@/pages/User/Bookings";
import AddTour from "@/pages/Admin/AddTour";

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
            {
                Component: Analytics,
                path: 'analytics'
            },
            {
                Component: AddTour,
                path: 'add-tour'
            },
        ]
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