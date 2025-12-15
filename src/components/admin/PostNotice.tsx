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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      title: formData.get("title"),
      category: formData.get("category"),
      summary: formData.get("summary"),
      content: formData.get("content"),
      publishDate: formData.get("publishDate"),
    };

    console.log(payload); // send to API
    setLoading(false);
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
        </form>
      </CardContent>
    </Card>
  );
}
