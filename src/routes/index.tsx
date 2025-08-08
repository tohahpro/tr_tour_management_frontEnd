import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import About from "@/pages/About";
import dashboard from "@/pages/Admin/dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router"

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
        Component: Login,
        path: '/login'
    },
    {
        Component: Register,
        path: '/register'
    },
    {
        path: '/admin',
        Component: AdminLayout,
        children: [
            {
                // path: "dashboard",
                index: true,
                Component: dashboard
            }
        ]
    }

]);

export default router;