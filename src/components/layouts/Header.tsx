import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1 border-2" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <h2 className="font-bold capitalize md:text-xl">
        Ward 12 Digital Notice Board
      </h2>
     
    </header>
  );
};

export default Header;
