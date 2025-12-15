"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { categories, notices } from "@/constants";
import CategoryBadge from "./CategoryBadge";
import NoticeCard from "./NoticeCard";

const NoticeBoard = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="w-full space-y-6 ">
    
      <div className="relative">
        <Input placeholder="Search notices..." className="rounded-full px-10" />
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="flex gap-3 flex-wrap">
        {categories.map((c) => (
          <CategoryBadge
            key={c.category}
            label={c.category}
            icon={c.icon}
            selected={c.category === category}
            onClick={() => setCategory(c.category)}
          />
        ))}
      </div>

      <div className="space-y-4">
        {notices
          .filter((n) => category === "All" || n.category === category)
          .map((n) => (
            <NoticeCard key={n.title} n={n} />
          ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
