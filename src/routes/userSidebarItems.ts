import Bookings from "@/pages/User/Bookings";
import type { ISidebarItem } from "@/types";


export const userSidebarItems: ISidebarItem[] = [
    {
      title: "History",      
      items: [
        {
          title: "Bookings",
          url: "/user/bookings",
          component: Bookings,
        },
      ],
    },
]