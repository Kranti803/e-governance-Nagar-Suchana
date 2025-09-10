import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutGrid,
  Megaphone,
  Settings,
  FileText,
  Shield,
  SquarePlus,
  FolderKanban,
} from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

// This is sample data.
const data = {
  navMain: [
    {
      url: "#",
      items: [
        {
          title: "Citizen: Notice Board",
          url: "#",
          icon: <Megaphone size={28} />,
          isActive: true,
        },
        {
          title: "Citizen: Notice Detail",
          url: "#",
          icon: <FileText size={28} />,
        },
        {
          title: "Citizen: Setting",
          url: "#",
          icon: <Settings size={28} />,
        },
      ],
    },
    {
      url: "#",
      items: [
        {
          title: "Admin: Dashboard",
          url: "#",
          icon: <Shield size={28} />,
        },
        {
          title: "Admin: Post Notice",
          url: "#",
          icon: <SquarePlus size={28} />,
        },
        {
          title: "Admin: Manage Notices",
          url: "#",
          icon: <FolderKanban size={28} />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="p-4">
      <SidebarHeader className="">
        <Logo/>
      </SidebarHeader>

      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item, idx) => (
          <SidebarGroup key={idx}>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      size={"lg"}
                      asChild
                      className={`border-none outline-none font-semibold  ${
                        item?.isActive ? "bg-green-200 rounded-4xl" : ""
                      } hover:bg-green-200  text-[#0f2b66] rounded-4xl`}
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
      <SidebarRail />
    </Sidebar>
  );
}
