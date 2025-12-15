"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostNoticeAdmin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      title: String(formData.get("title") || "").trim(),
      category: String(formData.get("category") || "").trim(),
      summary: String(formData.get("summary") || "").trim(),
      content: String(formData.get("content") || "").trim(),
      publishDate: String(formData.get("publishDate") || "").trim(),
    };

    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Failed to post notice");
      }

      setMessage("Notice posted successfully");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post notice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="m-4 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Post New Notice</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <Label htmlFor="title">Notice Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Road Maintenance Schedule"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="category">Category</Label>
            <NativeSelect id="category" name="category" required>
              <NativeSelectOptGroup>Select category</NativeSelectOptGroup>
              <NativeSelectOption value="GENERAL">General</NativeSelectOption>
              <NativeSelectOption value="TAX">Tax</NativeSelectOption>
              <NativeSelectOption value="HEALTH">Health</NativeSelectOption>
              <NativeSelectOption value="EVENTS">Events</NativeSelectOption>
            </NativeSelect>
          </div>

          <div className="space-y-1">
            <Label htmlFor="summary">Short Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              rows={3}
              placeholder="Shown in notice card"
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-1">
            <Label htmlFor="content">Full Notice Content</Label>
            <Textarea
              id="content"
              name="content"
              rows={6}
              placeholder="Shown on Read More page"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="publishDate">Publish Date</Label>
            <Input
              id="publishDate"
              name="publishDate"
              type="date"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button type="submit" disabled={loading} className="bg-green-700 text-white hover:bg-green-700 hover:scale-105">
              {loading ? "Posting..." : "Publish Notice"}
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
        </form>
      </CardContent>
    </Card>
  );
}
