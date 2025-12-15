"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PostNoticeProps {
  onSubmit?: () => void; // callback after saving
}

const PostNotice: React.FC<PostNoticeProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setMessage(null);
    setError(null);

    if (!title.trim() || !category.trim() || !content.trim()) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category: category.trim(),
          content: content.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to save notice");
      }

      setMessage("Notice posted successfully");
      setTitle("");
      setCategory("");
      setContent("");

      if (onSubmit) onSubmit();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to post notice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter notice title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="content">Description</Label>
        <Textarea
          id="content"
          placeholder="Write notice details here..."
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Posting..." : "Post Notice"}
          </Button>
        </div>
        {(message || error) && (
          <p
            className={`text-sm ${error ? "text-red-600" : "text-green-600"}`}
            aria-live="polite"
          >
            {error || message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostNotice;
