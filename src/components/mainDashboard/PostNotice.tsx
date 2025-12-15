"use client";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // optional toast notification

interface PostNoticeProps {
  onSubmit?: () => void; // callback after saving
}

const PostNotice: React.FC<PostNoticeProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write notice details here...</p>",
  });

  const handleSubmit = async () => {
    if (!title || !category || !editor) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    const contentHtml = editor.getHTML();

    // Simulate API call
    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          content: contentHtml,
        }),
      });

      if (!res.ok) throw new Error("Failed to save notice");

      toast.success("Notice posted successfully!");
      setTitle("");
      setCategory("");
      editor.commands.clearContent();

      if (onSubmit) onSubmit();
    } catch (error) {
      console.error(error);
      toast.error("Failed to post notice");
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
        <Label>Description</Label>
        <div className="border rounded p-2 min-h-[200px]">
          {editor && <EditorContent editor={editor} />}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Posting..." : "Post Notice"}
        </Button>
      </div>
    </div>
  );
};

export default PostNotice;
