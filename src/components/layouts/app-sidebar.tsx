"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Megaphone,
  Settings,
  Shield,
  SquarePlus,
  FolderKanban,
} from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      url: "/dashboard",
      items: [
        {
          title: "Citizen: Notice Board",
          url: "/dashboard",
          icon: <Megaphone size={28} />,
        },
        {
          title: "Citizen: Setting",
          url: "/dashboard/settings",
          icon: <Settings size={28} />,
        },
      ],
    },
    {
      url: "/dashboard/admin",
      items: [
        {
          title: "Admin: Dashboard",
          url: "/dashboard/admin/details",
          icon: <Shield size={28} />,
        },
        {
          title: "Admin: Post Notice",
          url: "/dashboard/admin/post",
          icon: <SquarePlus size={28} />,
        },
        {
          title: "Admin: Manage Notices",
          url: "/dashboard/admin/manage_notices",
          icon: <FolderKanban size={28} />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Sidebar {...props} className="p-4">
      <SidebarHeader className="">
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((item, idx) => (
          <SidebarGroup key={idx}>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      size={"lg"}
                      asChild
                      isActive={pathname === item.url}
                      className="border-none outline-none font-semibold hover:bg-green-200  text-[#0f2b66] rounded-4xl"
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-x-3"
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
