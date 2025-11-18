import { LayoutGrid } from "lucide-react";
import React from "react";

const Logo = ({className}:{className?:string}) => {
  return (
    <h2 className={`flex items-center gap-x-4 text-[#0f2b66] font-extrabold text-2xl ${className}`}>
      <LayoutGrid />
      नगर सूचना
    </h2>
  );
};

export default Logo;
