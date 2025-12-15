"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Pencil } from "lucide-react";

/* ---------------- TYPES ---------------- */

type Notice = {
  _id: string;
  title: string;
  summary: string;
  content: string;
  category: "GENERAL" | "TAX" | "HEALTH" | "EVENTS";
  publishDate: string;
};

/* ---------------- COMPONENT ---------------- */

export default function ManageNoticeAdmin() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selected, setSelected] = useState<Notice | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  /* ---------- LOAD ---------- */
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

  /* ---------- DELETE ---------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this notice?")) return;
    try {
      setSubmitting(true);
      const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Failed to delete notice");
      setNotices((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete notice");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- UPDATE ---------- */
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected) return;

    setSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const payload = {
      title: String(formData.get("title")),
      summary: String(formData.get("summary")),
      content: String(formData.get("content")),
      category: formData.get("category") as Notice["category"],
      publishDate: String(formData.get("publishDate")),
    };

    try {
      const res = await fetch(`/api/notices/${selected._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Failed to update notice");

      setNotices((prev) =>
        prev.map((n) => (n._id === selected._id ? { ...n, ...payload } : n))
      );
      setOpen(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update notice");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="rounded-2xl m-4">
      <CardHeader>
        <CardTitle className="text-xl">Manage Notices</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading && <p className="text-sm text-muted-foreground">Loading notices...</p>}
        {error && (
          <p className="text-sm text-red-600" aria-live="polite">
            {error}
          </p>
        )}
        {!loading && !error && notices.length === 0 && (
          <p className="text-sm text-muted-foreground">No notices found.</p>
        )}
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="flex items-start justify-between rounded-xl border p-4"
          >
            <div className="space-y-1">
              <p className="font-medium">{notice.title}</p>
              <p className="text-sm text-muted-foreground">
                {notice.summary}
              </p>
              <span className="text-xs font-medium text-green-600">
                {notice.category}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  setSelected(notice);
                  setOpen(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="destructive"
                onClick={() => handleDelete(notice._id)}
                disabled={submitting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>

      {/* ---------- EDIT DIALOG ---------- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Notice</DialogTitle>
          </DialogHeader>

          {selected && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-1">
                <Label>Title</Label>
                <Input
                  name="title"
                  defaultValue={selected.title}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label>Category</Label>
                <NativeSelect
                  name="category"
                  defaultValue={selected.category}
                >
                  <NativeSelectOptGroup>
                    Select category
                  </NativeSelectOptGroup>
                  <NativeSelectOption value="GENERAL">
                    General
                  </NativeSelectOption>
                  <NativeSelectOption value="TAX">
                    Tax
                  </NativeSelectOption>
                  <NativeSelectOption value="HEALTH">
                    Health
                  </NativeSelectOption>
                  <NativeSelectOption value="EVENTS">
                    Events
                  </NativeSelectOption>
                </NativeSelect>
              </div>

              <div className="space-y-1">
                <Label>Summary</Label>
                <Textarea
                  name="summary"
                  defaultValue={selected.summary}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label>Content</Label>
                <Textarea
                  name="content"
                  rows={5}
                  defaultValue={selected.content}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label>Publish Date</Label>
                <Input
                  type="date"
                  name="publishDate"
                  defaultValue={selected.publishDate.split("T")[0]}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Updating..." : "Update Notice"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
