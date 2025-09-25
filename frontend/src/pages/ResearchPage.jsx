import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBook,
  IconBrandTabler,
  IconPencil,
  IconPlus,
  IconRobot,
  IconSearch,
  IconSettings,
  IconUser,
  IconUserBolt,
} from "@tabler/icons-react";
import { animate, motion } from "motion/react";
import { cn } from "../lib/utils";
import { ChatbotUI } from "../components/ChatbotUI";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ResearchPage() {
    const {user, loading} = useAuth()
    
  const links = [
    {
      label: "New Chat",
      href: "#",
      icon: (
        <IconPlus className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "User Guide",
      href: "#",
      icon: (
        <IconBook className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "AI Writer",
      href: "#",
      icon: (
        <IconPencil className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Search Paper",
      href: "#",
      icon: (
        <IconSearch className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full h-[87vh] max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
      )}>
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="fixed justify-between gap-10 h-full">
          <div className="flex flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto">
            <>
              {open ? <Logo />:<div
          className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />}
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          {open && <>
          <p className="text-xs text-gray-600">Chats</p>
          {/* {HERE GOES THE CHAT HISTORYYYYYYY} */}
          </>}
          </div>
          <div className="sticky flex items-center bottom-0 pt-5">
            <SidebarLink
              link={{
                label: user.name,
                href: "#",
                icon: (
                  <IconUser className="bg-gray-300 p-1 rounded-full w-6 h-6"/>
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white">
        Eureka.ai
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
  );
};

const Dashboard = () => {
  return (
    <div className="w-full flex justify-center">
    <Outlet/>
    </div>
  );
};
