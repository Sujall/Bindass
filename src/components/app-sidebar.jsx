"use client";

import { BookOpen, Bot, Home, Settings2 } from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/favicon.ico",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard/home",
      icon: Home,
      isActive: false,
    },
    {
      title: "Giveaways",
      url: "/dashboard/giveaway",
      icon: BookOpen,
    },
    {
      title: "Banners",
      url: "/dashboard/banners",
      icon: Settings2,
    },
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className={"border-b-2 border-gray-300"}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <Image
                  src={"/favicon.ico"}
                  width={25}
                  height={25}
                  alt={"Dashbaord Logo"}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-2xl">Bindass</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>{item.title}</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
