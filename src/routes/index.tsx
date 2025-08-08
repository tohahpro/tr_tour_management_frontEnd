import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import About from "@/pages/About";
import dashboard from "@/pages/Admin/dashboard";
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