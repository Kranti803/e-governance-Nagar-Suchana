"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { categories } from "@/constants";
import CategoryBadge from "./CategoryBadge";
import NoticeCard from "./NoticeCard";

const NoticeBoard = () => {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/notices");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to load notices");
        setNotices(data?.notices || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load notices");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    const selected = category.toLowerCase();
    return notices.filter((n) => {
      const matchCategory =
        selected === "all" || n.category?.toLowerCase() === selected;
      const matchText =
        !lower ||
        n.title?.toLowerCase().includes(lower) ||
        n.summary?.toLowerCase().includes(lower);
      return matchCategory && matchText;
    });
  }, [category, notices, query]);

  return (
    <div className="w-full space-y-6 ">
    
      <div className="relative">
        <Input
          placeholder="Search notices..."
          className="rounded-full px-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
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
        {loading && <p className="text-sm text-muted-foreground">Loading notices...</p>}
        {error && (
          <p className="text-sm text-red-600" aria-live="polite">
            {error}
          </p>
        )}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">No notices found.</p>
        )}
        {filtered.map((n) => (
          <NoticeCard key={n._id} n={n} />
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
