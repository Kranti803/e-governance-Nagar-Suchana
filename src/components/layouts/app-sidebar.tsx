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
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const [loggingOut, setLoggingOut] = React.useState(false);
  const [role, setRole] = useState<"admin" | "citizen" | null>(null);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoggingOut(false);
    }
  };

  useEffect(() => {
    const loadRole = async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error();
        setRole(data?.user?.role || "citizen");
      } catch {
        setRole("citizen");
      }
    };
    loadRole();
  }, []);

  return (
    <Sidebar {...props} className="p-4">
      <SidebarHeader className="">
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((group, idx) => {
          const isAdminGroup = group.url.startsWith("/dashboard/admin");
          if (isAdminGroup && role !== "admin") return null;
          return (
            <SidebarGroup key={idx}>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
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
          );
        })}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size={"lg"}
                  className="border-none outline-none font-semibold hover:bg-red-100 text-red-700 rounded-4xl"
                  onClick={handleLogout}
                  disabled={loggingOut}
                >
                  <div className="flex items-center gap-x-3">
                    <LogOut size={28} />
                    {loggingOut ? "Logging out..." : "Logout"}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
