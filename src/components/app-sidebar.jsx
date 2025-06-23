"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

const data = {
  user: {
    name: "Bindaas",
    email: "bindaaspay@gmail.com",
    avatar: "/avatars/",
  },

  navMain: [
    {
      title: "Home",
      url: "/dashboard/home",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "History",
      url: "/dashboard/history",
      icon: Bot,
    },
    {
      title: "Giveaway",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Create Giveaway", url: "/dashboard/giveaway" },
        { title: "Participants", url: "/dashboard/participant" },
        { title: "Winners", url: "/dashboard/winner" },
      ],
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: Settings2,
    }
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}